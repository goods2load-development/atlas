import { DeliveryBy } from '@/lib/filterStore';

import { ReactNode } from 'react';

export interface ICompetitivenessiteItem {
  name: string;
  value: number;
}

export interface IPerformanceCardData {
  average: string;
  lastYear: string | null;
}
