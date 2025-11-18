import React from 'react';
import { motion } from 'framer-motion';

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon, 
  onClick, 
  disabled = false,
  type = 'button',
  className = '',
  ...props 
}) {
  const variantClasses = {
    primary: 'bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-800',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
    success: 'bg-green-500 hover:bg-green-600 text-white',
    outline: 'border border-amber-600 text-amber-600 hover:bg-amber-50'
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </motion.button>
  );
}