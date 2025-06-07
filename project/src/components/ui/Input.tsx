import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Check } from 'lucide-react';

interface InputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  required = false,
  className = '',
}) => {
  const hasValue = value.length > 0;
  const isValid = hasValue && !error;

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`
            w-full px-4 py-3 rounded-lg border-2 transition-all duration-200
            ${error 
              ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
              : isValid
              ? 'border-green-300 focus:border-green-500 focus:ring-green-200'
              : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
            }
            focus:outline-none focus:ring-2 focus:ring-opacity-50
            bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white
            placeholder-gray-400 dark:placeholder-gray-500
          `}
        />
        
        {hasValue && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            {error ? (
              <AlertCircle className="w-5 h-5 text-red-500" />
            ) : (
              <Check className="w-5 h-5 text-green-500" />
            )}
          </motion.div>
        )}
      </div>
      
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-600 dark:text-red-400 flex items-center"
        >
          <AlertCircle className="w-4 h-4 mr-1" />
          {error}
        </motion.p>
      )}
    </div>
  );
};