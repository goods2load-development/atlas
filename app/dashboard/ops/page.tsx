import type { Metadata } from 'next';

import ControlTower from '@/components/Dashboard/ControlTower/ControlTower';

export const metadata: Metadata = {
  title: 'Atlas Control Tower | Goods2Load Ops',
  description:
    'Internal operations dashboard — forwarder roster, Hermes inbox, pipeline status.',
  robots: 'noindex, nofollow',
};

export default function OpsPage() {
  return <ControlTower />;
}
