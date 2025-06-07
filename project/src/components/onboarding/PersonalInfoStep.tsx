import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail } from 'lucide-react';
import { Input } from '../ui/Input';
import { PersonalInfo, ValidationErrors } from '../../types';
import { validatePersonalInfo } from '../../utils/validation';

interface PersonalInfoStepProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
  onValidationChange: (isValid: boolean) => void;
}

export const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
  data,
  onChange,
  onValidationChange,
}) => {
  const [errors, setErrors] = useState<ValidationErrors>({});

  useEffect(() => {
    const validationErrors = validatePersonalInfo(data.name, data.email);
    setErrors(validationErrors);
    onValidationChange(Object.keys(validationErrors).length === 0 && data.name && data.email);
  }, [data, onValidationChange]);

  const handleNameChange = (name: string) => {
    onChange({ ...data, name });
  };

  const handleEmailChange = (email: string) => {
    onChange({ ...data, email });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <User className="w-8 h-8 text-white" />
        </motion.div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome! Let's get to know you
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Tell us a bit about yourself to personalize your experience
        </p>
      </div>

      <div className="space-y-6">
        <Input
          label="Full Name"
          value={data.name}
          onChange={handleNameChange}
          placeholder="Enter your full name"
          error={errors.name}
          required
        />

        <Input
          label="Email Address"
          type="email"
          value={data.email}
          onChange={handleEmailChange}
          placeholder="Enter your email address"
          error={errors.email}
          required
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4"
      >
        <div className="flex items-start">
          <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
              Privacy Notice
            </h4>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Your information is secure and will only be used to personalize your dashboard experience.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};