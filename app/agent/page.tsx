import type { Metadata } from 'next';

import AgentFooter from '@/components/Agent/AgentFooter';
import AgentNav from '@/components/Agent/AgentNav';
import ChatAgent from '@/components/Agent/ChatAgent';

export const metadata: Metadata = {
  title: 'Freight Assistant | Goods2Load',
  description:
    'Describe your shipment in plain language and get matched with verified freight forwarders across MENA and 30+ countries.',
};

export default function AgentPage() {
  return (
    <>
      <AgentNav />
      <main className="container py-2">
        <ChatAgent />
      </main>
      <AgentFooter />
    </>
  );
}
