import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
  steps,
}) => {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      {/* Progress Bar */}
      <div className="relative">
        <div className="absolute top-4 left-0 w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </div>
        
        {/* Step Indicators */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;
            
            return (
              <motion.div
                key={step}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className={`
                    w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-semibold
                    ${isCompleted
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 border-transparent text-white'
                      : isCurrent
                      ? 'border-blue-600 bg-white dark:bg-gray-800 text-blue-600'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-400'
                    }
                  `}
                >
                  {isCompleted ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Check className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    stepNumber
                  )}
                </div>
                <span
                  className={`
                    mt-2 text-xs font-medium text-center max-w-20
                    ${isCurrent
                      ? 'text-blue-600 dark:text-blue-400'
                      : isCompleted
                      ? 'text-gray-600 dark:text-gray-400'
                      : 'text-gray-400 dark:text-gray-500'
                    }
                  `}
                >
                  {step}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};