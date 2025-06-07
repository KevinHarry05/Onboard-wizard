import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  onClick,
}) => {
  return (
    <motion.div
      className={`
        bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700
        ${hover ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
      whileHover={hover ? { y: -4, scale: 1.02 } : {}}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};