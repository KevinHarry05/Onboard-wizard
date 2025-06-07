import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Save, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';

import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';
import { ThemeToggle } from '../ui/ThemeToggle';
import { PersonalInfoStep } from './PersonalInfoStep';
import { BusinessInfoStep } from './BusinessInfoStep';
import { PreferencesStep } from './PreferencesStep';

import { OnboardingData, PersonalInfo, BusinessInfo, UserPreferences } from '../../types';
import { saveOnboardingData, saveOnboardingProgress, getOnboardingData, getOnboardingProgress } from '../../utils/storage';

interface OnboardingWizardProps {
  onComplete: (data: OnboardingData) => void;
}

const STEPS = ['Personal Info', 'Business Info', 'Preferences'];

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({ name: '', email: '' });
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({ 
    companyName: '', 
    industry: '', 
    companySize: '' 
  });
  const [preferences, setPreferences] = useState<UserPreferences>({ 
    theme: 'light', 
    dashboardLayout: 'comfortable' 
  });

  // Load saved data on mount
  useEffect(() => {
    const savedData = getOnboardingData();
    const savedProgress = getOnboardingProgress();
    
    if (savedData.personalInfo) {
      setPersonalInfo(savedData.personalInfo);
    }
    if (savedData.businessInfo) {
      setBusinessInfo(savedData.businessInfo);
    }
    if (savedData.preferences) {
      setPreferences(savedData.preferences);
    }
    
    setCurrentStep(savedProgress);
  }, []);

  // Save progress whenever step changes
  useEffect(() => {
    saveOnboardingProgress(currentStep);
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
      setIsValid(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setIsValid(false);
    }
  };

  const handleSaveAndExit = () => {
    const currentData = {
      personalInfo: currentStep >= 1 ? personalInfo : undefined,
      businessInfo: currentStep >= 2 ? businessInfo : undefined,
      preferences: currentStep >= 3 ? preferences : undefined,
    };
    
    saveOnboardingData(currentData);
    toast.info('Progress saved! You can continue later.');
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    try {
      const onboardingData: OnboardingData = {
        personalInfo,
        businessInfo,
        preferences,
        completedAt: new Date().toISOString(),
      };
      
      // Save to localStorage
      saveOnboardingData(onboardingData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Welcome aboard! Setting up your dashboard...');
      
      setTimeout(() => {
        onComplete(onboardingData);
      }, 1000);
      
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep
            data={personalInfo}
            onChange={setPersonalInfo}
            onValidationChange={setIsValid}
          />
        );
      case 2:
        return (
          <BusinessInfoStep
            data={businessInfo}
            onChange={setBusinessInfo}
            onValidationChange={setIsValid}
          />
        );
      case 3:
        return (
          <PreferencesStep
            data={preferences}
            onChange={setPreferences}
            onValidationChange={setIsValid}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="flex justify-between items-center p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-white">OnboardFlow</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={handleSaveAndExit}
            icon={<Save className="w-4 h-4" />}
          >
            Save & Exit
          </Button>
          <ThemeToggle />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 pb-6">
        <ProgressBar
          currentStep={currentStep}
          totalSteps={STEPS.length}
          steps={STEPS}
        />

        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 md:p-12"
          layout
        >
          <AnimatePresence mode="wait">
            <div key={currentStep}>
              {renderStep()}
            </div>
          </AnimatePresence>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            icon={<ArrowLeft className="w-4 h-4" />}
          >
            Back
          </Button>

          <div className="text-sm text-gray-500 dark:text-gray-400">
            Step {currentStep} of {STEPS.length}
          </div>

          {currentStep === STEPS.length ? (
            <Button
              onClick={handleSubmit}
              disabled={!isValid}
              loading={isLoading}
              icon={<CheckCircle className="w-4 h-4" />}
            >
              Complete Setup
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={!isValid}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};