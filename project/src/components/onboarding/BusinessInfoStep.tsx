import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, Briefcase } from 'lucide-react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { BusinessInfo, ValidationErrors } from '../../types';
import { validateBusinessInfo } from '../../utils/validation';

interface BusinessInfoStepProps {
  data: BusinessInfo;
  onChange: (data: BusinessInfo) => void;
  onValidationChange: (isValid: boolean) => void;
}

const INDUSTRIES = [
  { value: 'technology', label: 'Technology' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'finance', label: 'Finance' },
  { value: 'education', label: 'Education' },
  { value: 'retail', label: 'Retail' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'consulting', label: 'Consulting' },
  { value: 'media', label: 'Media & Entertainment' },
  { value: 'other', label: 'Other' },
];

const COMPANY_SIZES = [
  { value: '1-10', label: '1-10 employees' },
  { value: '11-50', label: '11-50 employees' },
  { value: '51-200', label: '51-200 employees' },
  { value: '201-500', label: '201-500 employees' },
  { value: '501-1000', label: '501-1000 employees' },
  { value: '1000+', label: '1000+ employees' },
];

export const BusinessInfoStep: React.FC<BusinessInfoStepProps> = ({
  data,
  onChange,
  onValidationChange,
}) => {
  const [errors, setErrors] = useState<ValidationErrors>({});

  useEffect(() => {
    const validationErrors = validateBusinessInfo(data.companyName, data.industry, data.companySize);
    setErrors(validationErrors);
    onValidationChange(
      Object.keys(validationErrors).length === 0 && 
      data.companyName && 
      data.industry && 
      data.companySize
    );
  }, [data, onValidationChange]);

  const handleCompanyNameChange = (companyName: string) => {
    onChange({ ...data, companyName });
  };

  const handleIndustryChange = (industry: string) => {
    onChange({ ...data, industry });
  };

  const handleCompanySizeChange = (companySize: string) => {
    onChange({ ...data, companySize });
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
          className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <Building2 className="w-8 h-8 text-white" />
        </motion.div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Tell us about your business
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Help us customize your experience based on your company profile
        </p>
      </div>

      <div className="space-y-6">
        <Input
          label="Company Name"
          value={data.companyName}
          onChange={handleCompanyNameChange}
          placeholder="Enter your company name"
          error={errors.companyName}
          required
        />

        <Select
          label="Industry"
          value={data.industry}
          onChange={handleIndustryChange}
          options={INDUSTRIES}
          placeholder="Select your industry"
          error={errors.industry}
          required
        />

        <Select
          label="Company Size"
          value={data.companySize}
          onChange={handleCompanySizeChange}
          options={COMPANY_SIZES}
          placeholder="Select company size"
          error={errors.companySize}
          required
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4"
      >
        <div className="flex items-start">
          <Briefcase className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-purple-900 dark:text-purple-100 mb-1">
              Why we ask this
            </h4>
            <p className="text-sm text-purple-700 dark:text-purple-300">
              This information helps us show relevant features and content tailored to your business size and industry.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};