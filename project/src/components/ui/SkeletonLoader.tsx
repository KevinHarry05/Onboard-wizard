import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonLoaderProps {
  width?: string;
  height?: string;
  className?: string;
  count?: number;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  width = 'w-full',
  height = 'h-4',
  className = '',
  count = 1,
}) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          className={`${width} ${height} bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${className}`}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: index * 0.1,
          }}
        />
      ))}
    </>
  );
};