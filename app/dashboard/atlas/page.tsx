import DashboardLayout from '@/app/_components/DashboardLayout/DashboardLayout';

import type { Metadata } from 'next';

import AtlasDashboard from '@/components/Dashboard/AtlasDashboard/AtlasDashboard';

export const metadata: Metadata = {
  title: 'Atlas Command Centre | Goods2Load',
  description:
    'Your AI-powered freight dashboard — Atlas agents work for you around the clock.',
};

export default function AtlasPage() {
  return (
    <DashboardLayout>
      <AtlasDashboard />
    </DashboardLayout>
  );
}
