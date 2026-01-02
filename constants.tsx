
import { User, UserRole, Account, TimelineEvent, PerformanceReport, Transaction, PaymentMethod, AppFeature, RolePermissions } from './types';

export const INITIAL_ROLE_PERMISSIONS: RolePermissions[] = [
  {
    role: UserRole.REP,
    enabledFeatures: [AppFeature.EMPLOYEE_DASHBOARD, AppFeature.TIMELINE, AppFeature.VOICE_AUTOMATION, AppFeature.COACHING]
  },
  {
    role: UserRole.ADMIN,
    enabledFeatures: [AppFeature.ADMIN_DASHBOARD, AppFeature.TIMELINE, AppFeature.SIMULATOR, AppFeature.STRATEGY, AppFeature.USER_MANAGEMENT]
  },
  {
    role: UserRole.SUPER_ADMIN,
    enabledFeatures: Object.values(AppFeature)
  }
];

export const MOCK_USERS: User[] = [
  { 
    id: 'u-admin', 
    name: 'Sarah Director', 
    role: UserRole.ADMIN, 
    avatar: 'https://picsum.photos/seed/sarah/100/100', 
    email: 'admin@nexus.ai', 
    territory: 'Corporate',
    target: 'N/A',
    appraisalPeriod: 'Annual'
  },
  { 
    id: 'u-rep', 
    name: 'Alex Rivera', 
    role: UserRole.REP, 
    avatar: 'https://picsum.photos/seed/alex/100/100', 
    email: 'alex@nexus.ai', 
    territory: 'Commercial Banking - NE',
    performanceScore: 88,
    currentRating: 'Meets',
    target: '$1.2B',
    appraisalPeriod: 'Q1 2024'
  },
  { 
    id: 'u-super', 
    name: 'Chief Systems Admin', 
    role: UserRole.SUPER_ADMIN, 
    avatar: 'https://picsum.photos/seed/system/100/100', 
    email: 'super@nexus.ai', 
    territory: 'Global Operations',
    target: 'N/A',
    appraisalPeriod: 'Continuous'
  }
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'tx-1', accountId: 'acc-1', amount: 1250000, currency: 'USD', method: PaymentMethod.TRANSFER, date: '2024-03-21 14:30', reference: 'Q1 DIVIDEND INBOUND', status: 'Cleared' },
  { id: 'tx-2', accountId: 'acc-1', amount: 45200, currency: 'USD', method: PaymentMethod.CARD, date: '2024-03-21 10:15', reference: 'RETAIL SETTLEMENT', status: 'Cleared' },
  { id: 'tx-3', accountId: 'acc-2', amount: 8500, currency: 'USD', method: PaymentMethod.POS, date: '2024-03-20 18:45', reference: 'NYC BRANCH #42 POS', status: 'Cleared' },
  { id: 'tx-4', accountId: 'acc-2', amount: 500000, currency: 'USD', method: PaymentMethod.TRANSFER, date: '2024-03-20 09:00', reference: 'CAPITAL INJECTION', status: 'Pending' },
  { id: 'tx-5', accountId: 'acc-3', amount: 2500000, currency: 'USD', method: PaymentMethod.TRANSFER, date: '2024-03-19 12:00', reference: 'LIQUIDITY SWAP', status: 'Cleared' },
  { id: 'tx-6', accountId: 'acc-1', amount: 15000, currency: 'USD', method: PaymentMethod.CARD, date: '2024-03-21 16:20', reference: 'EXECUTIVE TRAVEL', status: 'Flagged' },
];

export const MOCK_REPS: User[] = [
  { id: 'rm-001', name: 'Alex Rivera', role: UserRole.REP, avatar: 'https://picsum.photos/seed/alex/100/100', email: 'alex@nexus.ai', territory: 'NE', performanceScore: 92, currentRating: 'Exceeds', target: '$1.2B', appraisalPeriod: 'Q1 2024' },
  { id: 'rm-002', name: 'Jordan Smith', role: UserRole.REP, avatar: 'https://picsum.photos/seed/jordan/100/100', email: 'jordan@nexus.ai', territory: 'EMEA', performanceScore: 74, currentRating: 'Meets', target: '$850M', appraisalPeriod: 'Q1 2024' },
  { id: 'rm-003', name: 'Sarah Chen', role: UserRole.REP, avatar: 'https://picsum.photos/seed/sarah/100/100', email: 'sarah@nexus.ai', territory: 'APAC', performanceScore: 45, currentRating: 'Developing', target: '$2.1B', appraisalPeriod: 'Q2 2024' }
];

export const MOCK_ACCOUNTS: Account[] = [
  { 
    id: 'acc-1', 
    name: 'Global Asset Partners', 
    industry: 'Hedge Fund', 
    size: 'Enterprise', 
    churnRisk: 12, 
    healthScore: 92, 
    repId: 'rm-001', 
    aum: '$4.2B', 
    riskCategory: 'Low', 
    lastCheckup: '2023-11-15', 
    needsCheckup: false,
    onboardingProgress: 100,
    onboardingSteps: [
      { id: 's1', name: 'KYC Identity Verification', status: 'Completed', category: 'Compliance' },
      { id: 's2', name: 'AML Background Screening', status: 'Completed', category: 'Compliance' },
      { id: 's3', name: 'Institutional MSA Signing', status: 'Completed', category: 'Legal' },
      { id: 's4', name: 'Credit Line Underwriting', status: 'Completed', category: 'Credit' }
    ]
  },
  { 
    id: 'acc-2', 
    name: 'Lighthouse FinTech', 
    industry: 'Payments', 
    size: 'Mid-Market', 
    churnRisk: 68, 
    healthScore: 38, 
    repId: 'rm-001', 
    aum: '$120M', 
    riskCategory: 'High', 
    lastCheckup: '2023-09-10', 
    needsCheckup: true,
    onboardingProgress: 65,
    onboardingSteps: [
      { id: 's1', name: 'KYC Identity Verification', status: 'Completed', category: 'Compliance' },
      { id: 's2', name: 'AML Background Screening', status: 'In Progress', category: 'Compliance' },
      { id: 's3', name: 'Tax Residence Disclosure', status: 'Pending', category: 'Compliance' },
      { id: 's4', name: 'Operational Portal Setup', status: 'Completed', category: 'Operational' }
    ]
  },
  { 
    id: 'acc-3', 
    name: 'Blue Chip Trust', 
    industry: 'Private Equity', 
    size: 'Enterprise', 
    churnRisk: 8, 
    healthScore: 95, 
    repId: 'rm-001', 
    aum: '$12.8B', 
    riskCategory: 'Low', 
    lastCheckup: '2023-12-05', 
    needsCheckup: false,
    onboardingProgress: 100,
    onboardingSteps: [
      { id: 's1', name: 'KYC Identity Verification', status: 'Completed', category: 'Compliance' },
      { id: 's2', name: 'FATCA Documentation', status: 'Completed', category: 'Compliance' },
      { id: 's3', name: 'Board Resolution Review', status: 'Completed', category: 'Legal' }
    ]
  },
  { 
    id: 'acc-4', 
    name: 'Venture Ridge', 
    industry: 'VC', 
    size: 'Mid-Market', 
    churnRisk: 42, 
    healthScore: 52, 
    repId: 'rm-002', 
    aum: '$450M', 
    riskCategory: 'Medium', 
    lastCheckup: '2023-10-20', 
    needsCheckup: true,
    onboardingProgress: 25,
    onboardingSteps: [
      { id: 's1', name: 'KYC Identity Verification', status: 'In Progress', category: 'Compliance' },
      { id: 's2', name: 'Entity Structure Review', status: 'Pending', category: 'Legal' },
      { id: 's3', name: 'Initial Deposit Wire', status: 'Pending', category: 'Operational' }
    ]
  },
];

export const MOCK_REPORTS: PerformanceReport[] = [
  {
    id: 'rep-1',
    repId: 'rm-001',
    repName: 'Alex Rivera',
    timeframe: 'Daily',
    dateSubmitted: '2024-03-20',
    achievements: 'Finalized $50M credit facility for Global Asset Partners. Conducted 3 feedback calls.',
    prospectiveClients: [
      { name: 'Skyline Tech', potentialAum: '$250M', priority: 'High' },
      { name: 'DeepBlue Robotics', potentialAum: '$45M', priority: 'Medium' }
    ],
    status: 'Reviewed'
  },
  {
    id: 'rep-2',
    repId: 'rm-002',
    repName: 'Jordan Smith',
    timeframe: 'Weekly',
    dateSubmitted: '2024-03-18',
    achievements: 'Onboarded 2 new mid-market VC accounts. Resolved KYC backlog for EMEA region.',
    prospectiveClients: [
      { name: 'Swiss Horizon', potentialAum: '$1.2B', priority: 'High' }
    ],
    status: 'Pending'
  }
];

export const MOCK_TIMELINE: TimelineEvent[] = [
  { id: '1', type: 'SALE', title: 'Line of Credit Issued', description: 'Approved $50M revolving credit facility.', date: '2023-12-01' },
  { id: '2', type: 'COMPLIANCE', title: 'KYC Refresh Completed', description: 'Anti-Money Laundering docs verified.', date: '2023-12-15', status: 'Verified' },
  { id: 'tx-v-1', type: 'DEPOSIT', title: 'Institutional Deposit', description: 'Liquidity injection via SWIFT Transfer.', date: '2024-03-21', status: 'Cleared', metadata: { amount: 1250000, method: PaymentMethod.TRANSFER } },
  { id: '3', type: 'SUPPORT', title: 'SWIFT Delay Resolved', description: 'Cross-border transfer bottleneck cleared.', date: '2024-01-05', status: 'High Priority' },
  { id: '4', type: 'CONTRACT', title: 'Yield Optimization', description: 'Moved $10M into high-yield treasury account.', date: '2024-02-20' },
  { id: '5', type: 'COMPLIANCE', title: 'Risk Warning', description: 'Unusual capital outflow detected (15% of AUM).', date: '2024-03-01', status: 'Alert' },
];
