import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, FolderOpen, Bell, Settings, LogOut, RefreshCw } from 'lucide-react';
import { toast } from 'react-toastify';

import { StatsCard } from './StatsCard';
import { WeeklyChart } from './WeeklyChart';
import { WelcomeCard } from './WelcomeCard';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { ThemeToggle } from '../ui/ThemeToggle';
import { SkeletonLoader } from '../ui/SkeletonLoader';

import { OnboardingData, DashboardStats } from '../../types';
import { clearOnboardingData } from '../../utils/storage';

interface DashboardProps {
  data: OnboardingData;
  onRestart: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ data, onRestart }) => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading dashboard data
    const loadStats = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate some mock stats based on company size
      const getStatsForCompanySize = (size: string) => {
        switch (size) {
          case '1-10':
            return { teamMembers: 8, activeProjects: 3, notifications: 12 };
          case '11-50':
            return { teamMembers: 32, activeProjects: 8, notifications: 24 };
          case '51-200':
            return { teamMembers: 156, activeProjects: 15, notifications: 45 };
          case '201-500':
            return { teamMembers: 324, activeProjects: 28, notifications: 67 };
          case '501-1000':
            return { teamMembers: 742, activeProjects: 42, notifications: 89 };
          default:
            return { teamMembers: 1250, activeProjects: 67, notifications: 134 };
        }
      };
      
      setStats(getStatsForCompanySize(data.businessInfo.companySize));
      setLoading(false);
    };

    loadStats();
  }, [data.businessInfo.companySize]);

  const handleRestart = () => {
    clearOnboardingData();
    toast.info('Starting fresh onboarding process...');
    onRestart();
  };

  if (loading || !stats) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex justify-between items-center p-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <SkeletonLoader width="w-8\" height="h-8" />
            <SkeletonLoader width="w-32\" height="h-6" />
          </div>
          <div className="flex items-center space-x-4">
            <SkeletonLoader width="w-24" height="h-8" />
            <SkeletonLoader width="w-8" height="h-8" />
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto p-6 space-y-6">
          <SkeletonLoader width="w-full" height="h-32" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SkeletonLoader width="w-full" height="h-32" count={3} className="mb-4" />
          </div>
          
          <SkeletonLoader width="w-full" height="h-80" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <FolderOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">Dashboard</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                icon={<Settings className="w-4 h-4" />}
                onClick={() => toast.info('Settings coming soon!')}
              >
                Settings
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                icon={<RefreshCw className="w-4 h-4" />}
                onClick={handleRestart}
              >
                Restart Onboarding
              </Button>
              
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Welcome Card */}
        <WelcomeCard data={data} />
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            title="Team Members"
            value={stats.teamMembers.toLocaleString()}
            icon={Users}
            color="bg-gradient-to-r from-blue-500 to-blue-600"
            trend={{ value: 12, isPositive: true }}
            delay={0.1}
          />
          
          <StatsCard
            title="Active Projects"
            value={stats.activeProjects}
            icon={FolderOpen}
            color="bg-gradient-to-r from-green-500 to-green-600"
            trend={{ value: 8, isPositive: true }}
            delay={0.2}
          />
          
          <StatsCard
            title="Notifications"
            value={stats.notifications}
            icon={Bell}
            color="bg-gradient-to-r from-purple-500 to-purple-600"
            trend={{ value: 3, isPositive: false }}
            delay={0.3}
          />
        </div>
        
        {/* Chart */}
        <WeeklyChart />
        
        {/* Additional Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Your Preferences
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Theme</span>
                  <span className="font-medium text-gray-900 dark:text-white capitalize">
                    {data.preferences.theme}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Layout</span>
                  <span className="font-medium text-gray-900 dark:text-white capitalize">
                    {data.preferences.dashboardLayout}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Company Size</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {data.businessInfo.companySize} employees
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  icon={<Users className="w-4 h-4" />}
                  onClick={() => toast.info('Team management coming soon!')}
                >
                  Manage Team
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  icon={<FolderOpen className="w-4 h-4" />}
                  onClick={() => toast.info('Project management coming soon!')}
                >
                  View Projects
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  icon={<Settings className="w-4 h-4" />}
                  onClick={() => toast.info('Account settings coming soon!')}
                >
                  Account Settings
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};