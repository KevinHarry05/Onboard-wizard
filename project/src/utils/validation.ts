import { ValidationErrors } from '../types';

export const validateEmail = (email: string): string => {
  if (!email) return 'Email is required';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Please enter a valid email address';
  return '';
};

export const validateRequired = (value: string, fieldName: string): string => {
  if (!value || value.trim() === '') {
    return `${fieldName} is required`;
  }
  return '';
};

export const validatePersonalInfo = (name: string, email: string): ValidationErrors => {
  const errors: ValidationErrors = {};
  
  const nameError = validateRequired(name, 'Name');
  if (nameError) errors.name = nameError;
  
  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;
  
  return errors;
};

export const validateBusinessInfo = (companyName: string, industry: string, companySize: string): ValidationErrors => {
  const errors: ValidationErrors = {};
  
  const companyError = validateRequired(companyName, 'Company name');
  if (companyError) errors.companyName = companyError;
  
  const industryError = validateRequired(industry, 'Industry');
  if (industryError) errors.industry = industryError;
  
  const sizeError = validateRequired(companySize, 'Company size');
  if (sizeError) errors.companySize = sizeError;
  
  return errors;
};