export interface PersonalInfo {
  name: string;
  email: string;
}

export interface BusinessInfo {
  companyName: string;
  industry: string;
  companySize: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  dashboardLayout: 'compact' | 'comfortable' | 'spacious';
}

export interface OnboardingData {
  personalInfo: PersonalInfo;
  businessInfo: BusinessInfo;
  preferences: UserPreferences;
  completedAt?: string;
}

export interface ValidationErrors {
  [key: string]: string;
}

export interface DashboardStats {
  teamMembers: number;
  activeProjects: number;
  notifications: number;
}

export interface ChartData {
  name: string;
  value: number;
  color: string;
}