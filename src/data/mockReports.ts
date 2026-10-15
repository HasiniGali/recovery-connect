import { ReportItem } from '../types';

export const INITIAL_REPORTS: ReportItem[] = [
  {
    id: 'rep-1',
    resourceId: 'res-12',
    resourceName: 'Katpadi Family & Youth Counselling Bureau',
    reason: 'phone_incorrect',
    reasonLabel: 'Phone number incorrect',
    description: 'The listed telephone line rings without answer during weekday afternoons. Please check if they updated their reception number.',
    submittedAt: '2 hours ago',
    status: 'pending'
  },
  {
    id: 'rep-2',
    resourceId: 'res-22',
    resourceName: 'Karunai Compassion Palliative & Grief Circle',
    reason: 'hours_incorrect',
    reasonLabel: 'Opening hours incorrect',
    description: 'The Sunday gathering has moved to 11:00 AM instead of 10:30 AM to accommodate bus arrival timings.',
    submittedAt: '1 day ago',
    status: 'pending'
  },
  {
    id: 'rep-3',
    resourceId: 'res-19',
    resourceName: 'Sunrise Adolescent & Youth De-Addiction Unit',
    reason: 'address_incorrect',
    reasonLabel: 'Address incorrect',
    description: 'Outpatient consultation desk moved 100 meters down the road into the new building wing.',
    submittedAt: '3 days ago',
    status: 'resolved',
    resolvedAt: '18 Sep 2026',
    resolutionNotes: 'Verified new building wing address and updated map marker.'
  }
];
