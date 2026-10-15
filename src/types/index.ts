export type ResourceCategory =
  | 'counselling'
  | 'recovery'
  | 'crisis'
  | 'support_group'
  | 'campus'
  | 'medical';

export type CostType = 'free' | 'sliding_scale' | 'low_cost' | 'paid' | 'insurance';

export type Language = 'English' | 'Tamil' | 'Hindi' | 'Telugu' | 'Malayalam';

export type VerificationStatus = 'verified' | 'needs_review' | 'reported';

export interface AuditHistoryItem {
  id: string;
  date: string;
  actor: 'Admin' | 'System' | 'Community Report' | 'Official Source';
  action: string;
  note: string;
}

export interface Resource {
  id: string;
  name: string;
  category: ResourceCategory;
  description: string;
  shortDescription: string;
  phone: string;
  website: string;
  email?: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  distanceKm: number;
  cost: CostType;
  costDetails: string;
  languages: Language[];
  eligibility: string;
  availability: 'open_today' | 'weekdays' | 'by_appointment' | '24_7';
  availabilityHours: string;
  appointmentRequired: boolean;
  source: string;
  sourceUrl: string;
  verificationDate: string;
  lastUpdated: string;
  verificationStatus: VerificationStatus;
  verificationNotes: string;
  isSynthetic: boolean;
  disclaimer: string;
  auditHistory: AuditHistoryItem[];
  accessibilityFeatures: string[];
  tags: string[];
}

export interface PreferenceExtraction {
  rawQuery: string;
  category?: ResourceCategory;
  cost?: CostType;
  language?: Language;
  location?: string;
  availability?: string;
  tokens: {
    type: 'category' | 'cost' | 'language' | 'location' | 'availability' | 'keyword';
    label: string;
    value: string;
  }[];
}

export interface MatchFactor {
  id: string;
  title: string;
  matches: boolean;
  detail: string;
}

export interface PreferenceMatchResult {
  score: number; // 0 to 100
  factors: MatchFactor[];
  summary: string;
}

export interface ReportItem {
  id: string;
  resourceId: string;
  resourceName: string;
  reason: 'phone_incorrect' | 'address_incorrect' | 'hours_incorrect' | 'no_longer_exists' | 'other';
  reasonLabel: string;
  description: string;
  submittedAt: string;
  status: 'pending' | 'resolved' | 'dismissed';
  resolvedAt?: string;
  resolutionNotes?: string;
}

export interface FilterState {
  category: ResourceCategory | 'all';
  cost: string | 'all';
  language: string | 'all';
  maxDistance: number; // in km
  availability: string | 'all';
  verifiedOnly: boolean;
  search: string;
}

export interface AdminStats {
  totalResources: number;
  verifiedResources: number;
  needsReviewResources: number;
  reportedResources: number;
  syntheticCount: number;
  openReportsCount: number;
}
