import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, AlertCircle, Check } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  error?: string;
  required?: boolean;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder = 'Select an option',
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
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`
            w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 appearance-none
            ${error 
              ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
              : isValid
              ? 'border-green-300 focus:border-green-500 focus:ring-green-200'
              : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
            }
            focus:outline-none focus:ring-2 focus:ring-opacity-50
            bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white
            cursor-pointer
          `}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2 pointer-events-none">
          {hasValue && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {error ? (
                <AlertCircle className="w-5 h-5 text-red-500" />
              ) : (
                <Check className="w-5 h-5 text-green-500" />
              )}
            </motion.div>
          )}
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </div>
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