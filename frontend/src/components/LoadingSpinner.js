import React from 'react';
import { motion } from 'framer-motion';

export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-[50vh]" data-testid="loading-spinner">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-16 h-16 border-4 border-brand-primary/30 border-t-brand-primary rounded-full"
      />
    </div>
  );
};

export const ErrorMessage = ({ message }) => {
  return (
    <div className="flex items-center justify-center min-h-[50vh]" data-testid="error-message">
      <div className="bg-destructive/10 border border-destructive/20 text-destructive px-6 py-4 rounded-lg max-w-md text-center">
        <p className="font-semibold">{message || 'Произошла ошибка'}</p>
      </div>
    </div>
  );
};