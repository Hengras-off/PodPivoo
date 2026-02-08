import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search as SearchIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      onClose();
      setQuery('');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
            data-testid="search-modal-backdrop"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-0 right-0 z-[70] flex justify-center px-4"
          >
            <div
              className="bg-card border border-border rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden"
              data-testid="search-modal"
            >
              <form onSubmit={handleSubmit} className="p-6">
                <div className="flex items-center space-x-4">
                  <SearchIcon className="w-6 h-6 text-muted-foreground" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Поиск фильмов, сериалов..."
                    className="flex-1 bg-transparent text-lg focus:outline-none"
                    data-testid="search-input"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                    data-testid="search-modal-close"
                    aria-label="Закрыть"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                  Нажмите Enter для поиска
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};