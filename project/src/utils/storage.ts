import { OnboardingData } from '../types';

const STORAGE_KEYS = {
  ONBOARDING_DATA: 'onboarding_data',
  ONBOARDING_PROGRESS: 'onboarding_progress',
  USER_THEME: 'user_theme',
} as const;

export const saveOnboardingData = (data: Partial<OnboardingData>) => {
  try {
    const existing = getOnboardingData();
    const updated = { ...existing, ...data };
    localStorage.setItem(STORAGE_KEYS.ONBOARDING_DATA, JSON.stringify(updated));
    return true;
  } catch (error) {
    console.error('Failed to save onboarding data:', error);
    return false;
  }
};

export const getOnboardingData = (): Partial<OnboardingData> => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ONBOARDING_DATA);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Failed to get onboarding data:', error);
    return {};
  }
};

export const saveOnboardingProgress = (step: number) => {
  try {
    localStorage.setItem(STORAGE_KEYS.ONBOARDING_PROGRESS, step.toString());
  } catch (error) {
    console.error('Failed to save onboarding progress:', error);
  }
};

export const getOnboardingProgress = (): number => {
  try {
    const progress = localStorage.getItem(STORAGE_KEYS.ONBOARDING_PROGRESS);
    return progress ? parseInt(progress, 10) : 1;
  } catch (error) {
    console.error('Failed to get onboarding progress:', error);
    return 1;
  }
};

export const clearOnboardingData = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.ONBOARDING_DATA);
    localStorage.removeItem(STORAGE_KEYS.ONBOARDING_PROGRESS);
  } catch (error) {
    console.error('Failed to clear onboarding data:', error);
  }
};

export const isOnboardingComplete = (): boolean => {
  try {
    const data = getOnboardingData();
    return !!(data.personalInfo && data.businessInfo && data.preferences && data.completedAt);
  } catch (error) {
    console.error('Failed to check onboarding status:', error);
    return false;
  }
};