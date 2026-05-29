'use client';

import { Bell, Link2, MessageCircle, Send, Zap } from 'lucide-react';

const DEMO_THREADS = [
  {
    name: 'Global Pharma Group',
    time: '2 min ago',
    last: "Thanks, we'll go with your rate for the Baghdad shipment.",
    unread: 1,
    tag: 'Booking confirmed',
    tagColor: 'bg-green-50 text-green-700 border-green-100',
  },
  {
    name: 'AeroTrade LLC',
    time: '1 hr ago',
    last: 'Can you handle 2-8°C cold chain from Dubai to Amman?',
    unread: 0,
    tag: 'Momentum lead',
    tagColor: 'bg-primaryOrange/8 text-primaryOrange border-primaryOrange/20',
  },
  {
    name: 'MedSupply MENA',
    time: '3 hr ago',
    last: 'Please send your rates for FCL Jebel Ali → Mumbai.',
    unread: 0,
    tag: 'Rate request',
    tagColor: 'bg-blue-50 text-blue-700 border-blue-100',
  },
  {
    name: 'Momentum (auto-reply)',
    time: 'Yesterday',
    last: '🔍 Searching the Goods2Load network for best matches…',
    unread: 0,
    tag: 'Auto',
    tagColor: 'bg-gray-50 text-gray-500 border-gray-200',
    isAtlas: true,
  },
];

export default function WhatsAppForwarderSection() {
  return (
    <div className="flex flex-col h-full overflow-y-auto hide-scrollbar">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-border">
        <h2 className="text-lg font-bold text-black">WhatsApp</h2>
        <p className="text-[12px] text-muted-foreground">
          Momentum handles shipper messages and routes confirmed bookings
          directly to you
        </p>
      </div>

      <div className="p-6 space-y-5">
        {/* Connect CTA */}
        <div className="bg-[#0d0d1a] rounded-xl p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-[#25D366]/15 flex items-center justify-center shrink-0">
            <MessageCircle size={18} className="text-[#25D366]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-white">
              Connect your WhatsApp Business
            </p>
            <p className="text-[11px] text-white/50 mt-0.5 leading-relaxed">
              When connected, Momentum routes incoming shipper messages to your
              dashboard, sends auto-acknowledgements, and notifies you instantly
              when a booking is confirmed.
            </p>
            <button className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold text-[#25D366] border border-[#25D366]/30 rounded-full px-3 py-1 hover:bg-[#25D366]/10 transition-colors">
              <Link2 size={10} /> Connect WhatsApp — go live
            </button>
          </div>
          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/20 shrink-0">
            DEMO
          </span>
        </div>

        {/* Inbox preview */}
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <div className="px-5 py-3 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              <p className="text-[11px] font-semibold text-black uppercase tracking-wider">
                Inbox — routed by Momentum
              </p>
            </div>
            <span className="text-[10px] text-muted-foreground">
              4 conversations
            </span>
          </div>

          <div className="divide-y divide-border">
            {DEMO_THREADS.map((t, i) => (
              <div
                key={i}
                className="flex items-start gap-3 px-5 py-3.5 hover:bg-gray-50/60 transition-colors cursor-pointer"
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-bold text-white shrink-0 ${t.isAtlas ? 'bg-[#0d0d1a]' : 'bg-primaryOrange'}`}
                >
                  {t.isAtlas ? 'M' : t.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <p className="text-[12px] font-semibold text-black truncate">
                      {t.name}
                    </p>
                    <p className="text-[10px] text-muted-foreground shrink-0">
                      {t.time}
                    </p>
                  </div>
                  <p className="text-[11px] text-muted-foreground truncate">
                    {t.last}
                  </p>
                  <span
                    className={`inline-block text-[9px] font-semibold mt-1 px-2 py-0.5 rounded-full border ${t.tagColor}`}
                  >
                    {t.tag}
                  </span>
                </div>
                {t.unread > 0 && (
                  <span className="w-4 h-4 rounded-full bg-[#25D366] text-white text-[9px] font-bold flex items-center justify-center shrink-0 mt-1">
                    {t.unread}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* What Atlas does */}
        <div className="bg-white rounded-xl border border-border p-5">
          <h3 className="text-[11px] font-semibold text-black uppercase tracking-wider mb-3">
            What Momentum does with your WhatsApp
          </h3>
          <div className="space-y-3">
            {[
              {
                icon: Zap,
                text: 'Instantly acknowledges shipper messages so no lead goes cold',
              },
              {
                icon: MessageCircle,
                text: 'Routes confirmed bookings directly to your dashboard',
              },
              {
                icon: Bell,
                text: 'Notifies you when a shipper selects your company',
              },
              {
                icon: Send,
                text: 'Lets you reply directly from this dashboard to the shipper',
              },
            ].map(({ icon: Icon, text }, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-md bg-[#25D366]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon size={11} className="text-[#25D366]" />
                </div>
                <p className="text-[12px] text-muted-foreground leading-relaxed">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
