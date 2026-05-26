import type { Metadata } from 'next';

import AtlasDashboard from '@/components/Dashboard/AtlasDashboard/AtlasDashboard';

export const metadata: Metadata = {
  title: 'Atlas Command Centre | Goods2Load',
  description:
    'Your AI-powered freight dashboard — Atlas agents work for you around the clock.',
};

export default function AtlasPage() {
  // Atlas has its own full-screen sidebar — no outer DashboardLayout wrapper needed
  return <AtlasDashboard />;
}
