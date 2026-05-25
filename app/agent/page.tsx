import type { Metadata } from 'next';

import ChatAgent from '@/components/Agent/ChatAgent';

export const metadata: Metadata = {
  title: 'Freight Assistant | Goods2Load',
  description:
    'Describe your shipment in plain language and get matched with verified freight forwarders across MENA and 30+ countries.',
};

// /agent route. If your site wraps pages in MainLayout (header/footer),
// either render this inside that layout or rely on app/layout.tsx as the
// existing pages do. Container padding matches the site's `container` config.
export default function AgentPage() {
  return (
    <main className="container py-8">
      <ChatAgent />
    </main>
  );
}
