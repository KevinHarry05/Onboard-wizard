import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { Card } from '../ui/Card';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  delay?: number;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  color,
  trend,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      <Card hover className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {title}
            </p>
            <motion.p
              className="text-2xl font-bold text-gray-900 dark:text-white mt-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: delay + 0.2, type: 'spring', stiffness: 200 }}
            >
              {value}
            </motion.p>
            {trend && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: delay + 0.4 }}
                className={`flex items-center mt-2 text-sm ${
                  trend.isPositive ? 'text-green-600' : 'text-red-600'
                }`}
              >
                <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                  trend.isPositive ? 'bg-green-400' : 'bg-red-400'
                }`} />
                {trend.isPositive ? '+' : ''}{trend.value}% from last month
              </motion.div>
            )}
          </div>
          <motion.div
            className={`p-3 rounded-full ${color}`}
            initial={{ rotate: -180, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ delay: delay + 0.1, type: 'spring', stiffness: 200 }}
          >
            <Icon className="w-6 h-6 text-white" />
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
};