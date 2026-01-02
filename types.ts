
export enum UserRole {
  REP = 'REP',
  MANAGER = 'MANAGER',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN'
}

export enum AppFeature {
  EMPLOYEE_DASHBOARD = 'employee-dashboard',
  ADMIN_DASHBOARD = 'admin-dashboard',
  VOICE_AUTOMATION = 'voice-automation',
  TIMELINE = 'timeline',
  SIMULATOR = 'simulator',
  STRATEGY = 'strategy',
  COACHING = 'coaching',
  USER_MANAGEMENT = 'user-management',
  FEATURE_SETTINGS = 'feature-settings'
}

export interface RolePermissions {
  role: UserRole;
  enabledFeatures: AppFeature[];
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
  email: string;
  territory: string;
  performanceScore?: number;
  currentRating?: 'Exceeds' | 'Meets' | 'Developing' | 'Below';
  target?: string;
  appraisalPeriod?: string;
}

export enum PaymentMethod {
  TRANSFER = 'TRANSFER',
  POS = 'POS',
  CARD = 'CARD'
}

export interface Transaction {
  id: string;
  accountId: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  date: string;
  reference: string;
  status: 'Cleared' | 'Pending' | 'Flagged';
}

export interface KPI {
  target: number;
  achieved: number;
  aumGrowth: number;
  complianceScore: number;
  activeAccounts: number;
}

export interface TimelineEvent {
  id: string;
  type: 'SALE' | 'SUPPORT' | 'PRODUCT' | 'CONTRACT' | 'COMPLIANCE' | 'VOICE_FEEDBACK' | 'REPORT_SUBMISSION' | 'DEPOSIT';
  title: string;
  description: string;
  date: string;
  status?: string;
  metadata?: any;
}

export interface OnboardingStep {
  id: string;
  name: string;
  status: 'Completed' | 'In Progress' | 'Pending';
  category: 'Compliance' | 'Legal' | 'Operational' | 'Credit';
}

export interface PerformanceReport {
  id: string;
  repId: string;
  repName: string;
  timeframe: 'Daily' | 'Weekly' | 'Monthly';
  dateSubmitted: string;
  achievements: string;
  prospectiveClients: { name: string; potentialAum: string; priority: 'Low' | 'Medium' | 'High' }[];
  status: 'Pending' | 'Reviewed';
}

export interface Account {
  id: string;
  name: string;
  industry: string;
  size: 'SMB' | 'Mid-Market' | 'Enterprise';
  churnRisk: number;
  healthScore: number;
  repId: string;
  aum: string;
  riskCategory: 'Low' | 'Medium' | 'High';
  lastCheckup?: string;
  needsCheckup?: boolean;
  onboardingProgress: number; // 0-100
  onboardingSteps: OnboardingStep[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}
