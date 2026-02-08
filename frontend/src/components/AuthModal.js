import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const { login, signup } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const result = login(formData.email, formData.password);
      if (result.success) {
        onClose();
        setFormData({ name: '', email: '', password: '' });
      } else {
        setError(result.error);
      }
    } else {
      if (!formData.name || !formData.email || !formData.password) {
        setError('Заполните все поля');
        return;
      }
      const result = signup(formData.name, formData.email, formData.password);
      if (result.success) {
        onClose();
        setFormData({ name: '', email: '', password: '' });
      } else {
        setError(result.error);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({ name: '', email: '', password: '' });
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
            data-testid="auth-modal-backdrop"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          >
            <div
              className="bg-card border border-border rounded-lg shadow-2xl w-full max-w-md overflow-hidden"
              data-testid="auth-modal"
            >
              {/* Header */}
              <div className="relative h-32 bg-gradient-to-br from-brand-primary/20 to-brand-primary/5 flex items-center justify-center">
                <h2 className="text-3xl font-bold">
                  {isLogin ? 'Вход' : 'Регистрация'}
                </h2>
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
                  data-testid="auth-modal-close"
                  aria-label="Закрыть"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {!isLogin && (
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Имя
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-background border border-border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all"
                      data-testid="auth-name-input"
                      required={!isLogin}
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-background border border-border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all"
                    data-testid="auth-email-input"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-2">
                    Пароль
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-background border border-border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all"
                    data-testid="auth-password-input"
                    required
                  />
                </div>

                {error && (
                  <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-md text-sm" data-testid="auth-error-message">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-brand-primary hover:bg-brand-hover text-white font-bold py-3 rounded-md transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,59,48,0.3)]"
                  data-testid="auth-submit-button"
                >
                  {isLogin ? 'Войти' : 'Зарегистрироваться'}
                </button>

                <div className="text-center text-sm">
                  <span className="text-muted-foreground">
                    {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}{' '}
                  </span>
                  <button
                    type="button"
                    onClick={switchMode}
                    className="text-brand-primary font-semibold hover:underline"
                    data-testid="auth-switch-mode"
                  >
                    {isLogin ? 'Зарегистрироваться' : 'Войти'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};