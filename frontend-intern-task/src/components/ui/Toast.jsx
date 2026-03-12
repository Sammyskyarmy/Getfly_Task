import React, { useEffect } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '../common/Button';

export const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    if (duration && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-md shadow-lg border",
        type === 'success' ? "bg-white border-green-200 text-gray-900" : "bg-white border-red-200 text-gray-900"
      )}>
        {type === 'success' ? (
          <CheckCircle2 className="w-5 h-5 text-green-500" />
        ) : (
          <XCircle className="w-5 h-5 text-red-500" />
        )}
        <p className="text-sm font-medium">{message}</p>
        <button 
          onClick={onClose}
          className="ml-4 text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          &times;
        </button>
      </div>
    </div>
  );
};
