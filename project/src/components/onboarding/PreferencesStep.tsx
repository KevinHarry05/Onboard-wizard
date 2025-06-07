import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Palette, Layout, Sun, Moon, Grid, List, LayoutGrid } from 'lucide-react';
import { UserPreferences } from '../../types';
import { Card } from '../ui/Card';

interface PreferencesStepProps {
  data: UserPreferences;
  onChange: (data: UserPreferences) => void;
  onValidationChange: (isValid: boolean) => void;
}

export const PreferencesStep: React.FC<PreferencesStepProps> = ({
  data,
  onChange,
  onValidationChange,
}) => {
  useEffect(() => {
    onValidationChange(data.theme && data.dashboardLayout ? true : false);
  }, [data, onValidationChange]);

  const handleThemeChange = (theme: 'light' | 'dark') => {
    onChange({ ...data, theme });
  };

  const handleDashboardLayoutChange = (dashboardLayout: 'compact' | 'comfortable' | 'spacious') => {
    onChange({ ...data, dashboardLayout });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-16 h-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <Palette className="w-8 h-8 text-white" />
        </motion.div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Customize your experience
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Choose your preferred theme and dashboard layout
        </p>
      </div>

      {/* Theme Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <Sun className="w-5 h-5 mr-2" />
          Theme Preference
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { value: 'light', label: 'Light Theme', icon: Sun, preview: 'bg-white border-gray-200' },
            { value: 'dark', label: 'Dark Theme', icon: Moon, preview: 'bg-gray-800 border-gray-700' },
          ].map((option) => (
            <motion.div
              key={option.value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                hover
                onClick={() => handleThemeChange(option.value as 'light' | 'dark')}
                className={`p-4 cursor-pointer transition-all duration-200 ${
                  data.theme === option.value
                    ? 'ring-2 ring-blue-500 ring-offset-2 bg-blue-50 dark:bg-blue-900/20'
                    : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-8 rounded ${option.preview} border-2`} />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {option.label}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {option.value === 'light' ? 'Clean and bright interface' : 'Easy on the eyes'}
                    </p>
                  </div>
                  <option.icon className="w-5 h-5 text-gray-400 ml-auto" />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Dashboard Layout Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <Layout className="w-5 h-5 mr-2" />
          Dashboard Layout
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { 
              value: 'compact', 
              label: 'Compact', 
              icon: Grid, 
              description: 'Dense layout with more content',
              preview: 'space-y-1'
            },
            { 
              value: 'comfortable', 
              label: 'Comfortable', 
              icon: LayoutGrid, 
              description: 'Balanced spacing and content',
              preview: 'space-y-2'
            },
            { 
              value: 'spacious', 
              label: 'Spacious', 
              icon: List, 
              description: 'Relaxed layout with breathing room',
              preview: 'space-y-3'
            },
          ].map((option) => (
            <motion.div
              key={option.value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                hover
                onClick={() => handleDashboardLayoutChange(option.value as 'compact' | 'comfortable' | 'spacious')}
                className={`p-4 cursor-pointer transition-all duration-200 ${
                  data.dashboardLayout === option.value
                    ? 'ring-2 ring-blue-500 ring-offset-2 bg-blue-50 dark:bg-blue-900/20'
                    : ''
                }`}
              >
                <div className="text-center">
                  <div className="w-12 h-8 mx-auto mb-3 bg-gray-100 dark:bg-gray-700 rounded border">
                    <div className={`p-1 h-full ${option.preview}`}>
                      <div className="bg-gray-300 dark:bg-gray-600 rounded h-1"></div>
                      <div className="bg-gray-300 dark:bg-gray-600 rounded h-1"></div>
                      <div className="bg-gray-300 dark:bg-gray-600 rounded h-1"></div>
                    </div>
                  </div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                    {option.label}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {option.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-4"
      >
        <div className="flex items-start">
          <Palette className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-emerald-900 dark:text-emerald-100 mb-1">
              Customization Options
            </h4>
            <p className="text-sm text-emerald-700 dark:text-emerald-300">
              You can change these preferences anytime from your dashboard settings.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};