import React from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { Card } from '../ui/Card';

const data = [
  { name: 'Mon', progress: 65, tasks: 12 },
  { name: 'Tue', progress: 78, tasks: 15 },
  { name: 'Wed', progress: 82, tasks: 18 },
  { name: 'Thu', progress: 70, tasks: 14 },
  { name: 'Fri', progress: 85, tasks: 20 },
  { name: 'Sat', progress: 92, tasks: 22 },
  { name: 'Sun', progress: 88, tasks: 19 },
];

export const WeeklyChart: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
    >
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Weekly Progress
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your productivity this week
            </p>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2" />
              <span className="text-gray-600 dark:text-gray-400">Progress</span>
            </div>
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="progressGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
              <XAxis 
                dataKey="name" 
                stroke="#6B7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#6B7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(17, 24, 39, 0.8)',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#F9FAFB',
                }}
                labelStyle={{ color: '#F9FAFB' }}
              />
              <Area
                type="monotone"
                dataKey="progress"
                stroke="#3B82F6"
                strokeWidth={3}
                fill="url(#progressGradient)"
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </motion.div>
  );
};