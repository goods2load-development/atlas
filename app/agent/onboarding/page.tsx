import type { Metadata } from 'next';

import AgentFooter from '@/components/Agent/AgentFooter';
import AgentNav from '@/components/Agent/AgentNav';
import OnboardingAgent from '@/components/Onboarding/OnboardingAgent';

export const metadata: Metadata = {
  title: 'Join as a Freight Forwarder | Goods2Load',
  description:
    'Get verified on Goods2Load in minutes. Our AI assistant guides you through the onboarding — just answer the questions.',
};

export default function OnboardingPage() {
  return (
    <>
      <AgentNav />
      <main className="container py-2">
        <OnboardingAgent />
      </main>
      <AgentFooter />
    </>
  );
}
