import React from 'react';

const Toast = ({ show, message, type = 'error', onClose }) => {
  if (!show) return null;

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white';
      case 'warning':
        return 'bg-yellow-500 text-white';
      case 'error':
      default:
        return 'bg-red-500 text-white';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅';
      case 'warning':
        return '⚠️';
      case 'error':
      default:
        return '❌';
    }
  };

  return (
    <div className={`fixed top-4 right-4 z-[60] ${getToastStyles()} px-6 py-3 rounded-lg shadow-lg animate-slide-in-right`}>
      <div className="flex items-center gap-2">
        <span className="text-lg animate-bounce-in">{getIcon()}</span>
        <span className="animate-fade-in-delay">{message}</span>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-2 text-white hover:text-gray-200 transition-colors duration-200 transform hover:scale-110"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default Toast; 