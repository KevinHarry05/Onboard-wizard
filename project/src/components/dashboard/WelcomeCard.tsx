import React from 'react';
import { motion } from 'framer-motion';
import { User, Calendar, MapPin } from 'lucide-react';
import { Card } from '../ui/Card';
import { OnboardingData } from '../../types';

interface WelcomeCardProps {
  data: OnboardingData;
}

export const WelcomeCard: React.FC<WelcomeCardProps> = ({ data }) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="flex items-center space-x-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-xl font-bold"
          >
            {getInitials(data.personalInfo.name)}
          </motion.div>
          
          <div className="flex-1">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold mb-1"
            >
              Welcome back, {data.personalInfo.name.split(' ')[0]}!
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-1 text-white/80"
            >
              <div className="flex items-center text-sm">
                <User className="w-4 h-4 mr-2" />
                {data.businessInfo.companyName} • {data.businessInfo.industry}
              </div>
              
              {data.completedAt && (
                <div className="flex items-center text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Joined {formatDate(data.completedAt)}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};