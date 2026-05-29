'use client';

import { useState } from 'react';

import {
  Calendar,
  CheckCircle,
  ChevronRight,
  Clock,
  Link2,
  Mail,
  MessageCircle,
  Package,
  Reply,
  Zap,
} from 'lucide-react';

const DEMO_EMAILS = [
  {
    id: 'e1',
    from: 'procurement@globalpharmamena.com',
    sender: 'Global Pharma MENA',
    subject: 'Urgent — Cold chain shipment Dubai → Baghdad',
    preview:
      'We need a rate for 1,200 kg of pharma goods 2–8°C GDP certified, door to door, ASAP...',
    time: '08:14',
    date: 'Today',
    unread: true,
    tag: 'Lead detected',
    tagColor: 'bg-primaryOrange/8 text-primaryOrange border-primaryOrange/20',
    momentumAction: 'Momentum drafted a reply and added to pipeline',
    actionColor: 'text-primaryOrange',
  },
  {
    id: 'e2',
    from: 'logistics@aerotradellc.ae',
    sender: 'AeroTrade LLC',
    subject: 'FCL quote request — Shenzhen to Jebel Ali',
    preview:
      'Hi, we are looking for competitive rates on a 40HC container from Shenzhen...',
    time: '07:32',
    date: 'Today',
    unread: true,
    tag: 'Lead detected',
    tagColor: 'bg-primaryOrange/8 text-primaryOrange border-primaryOrange/20',
    momentumAction: 'Momentum queried Maersk + MSC rates, draft ready',
    actionColor: 'text-primaryOrange',
  },
  {
    id: 'e3',
    from: 'ops@medsupplymena.com',
    sender: 'MedSupply MENA',
    subject: 'Re: Rate confirmation — BOM → DXB',
    preview:
      'Thank you for the quote. We confirm the booking for 800 kg on the Emirates...',
    time: 'Yesterday',
    date: 'Yesterday',
    unread: false,
    tag: 'Booking confirmed',
    tagColor: 'bg-green-50 text-green-700 border-green-100',
    momentumAction: 'Momentum created shipment event in calendar',
    actionColor: 'text-green-600',
  },
  {
    id: 'e4',
    from: 'trade@tanakajapan.co.jp',
    sender: 'Tanaka Trading Co.',
    subject: 'Inquiry: sea freight Osaka → Rotterdam via Dubai',
    preview:
      'Dear team, we are evaluating freight forwarders for a regular lane between...',
    time: 'Yesterday',
    date: 'Yesterday',
    unread: false,
    tag: 'Lead detected',
    tagColor: 'bg-primaryOrange/8 text-primaryOrange border-primaryOrange/20',
    momentumAction: 'Momentum added to pipeline as Sea lead',
    actionColor: 'text-primaryOrange',
  },
  {
    id: 'e5',
    from: 'shipping@müllergmbh.de',
    sender: 'Müller GmbH',
    subject: 'Follow-up: Frankfurt auto parts air freight rate',
    preview:
      'Following our call last week, could you confirm the rate for 800 kg automotive...',
    time: '2 days ago',
    date: '27 May',
    unread: false,
    tag: 'Follow-up',
    tagColor: 'bg-blue-50 text-blue-700 border-blue-100',
    momentumAction: 'Momentum linked to existing lead in pipeline',
    actionColor: 'text-blue-600',
  },
];

export default function EmailSection() {
  const [selected, setSelected] = useState<string | null>('e1');

  const selectedEmail = DEMO_EMAILS.find((e) => e.id === selected);
  const unreadCount = DEMO_EMAILS.filter((e) => e.unread).length;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-border flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-lg font-bold text-black">Email</h2>
          <p className="text-[12px] text-muted-foreground">
            Momentum reads your inbox, detects freight inquiries, and converts
            them to leads automatically
          </p>
        </div>
        {unreadCount > 0 && (
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-primaryOrange text-white shrink-0">
            {unreadCount} new
          </span>
        )}
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Email list */}
        <div className="w-[280px] shrink-0 border-r border-border flex flex-col overflow-hidden">
          {/* Connect CTA */}
          <div className="px-4 py-3 bg-[#0d0d1a] border-b border-white/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail size={12} className="text-primaryOrange" />
                <span className="text-[11px] font-semibold text-white">
                  Connect your inbox
                </span>
              </div>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/20">
                DEMO
              </span>
            </div>
            <button className="mt-2 flex items-center gap-1.5 text-[10px] font-semibold text-primaryOrange border border-primaryOrange/30 rounded-full px-2.5 py-0.5 hover:bg-primaryOrange/10 transition-colors">
              <Link2 size={9} /> Gmail · Outlook · IMAP
            </button>
          </div>

          {/* Email threads */}
          <div className="flex-1 overflow-y-auto divide-y divide-border">
            {DEMO_EMAILS.map((email) => (
              <button
                key={email.id}
                onClick={() => setSelected(email.id)}
                className={`w-full text-left px-4 py-3 transition-colors hover:bg-gray-50 ${
                  selected === email.id
                    ? 'bg-primaryOrange/5 border-l-2 border-primaryOrange'
                    : ''
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span
                    className={`text-[11px] font-semibold truncate ${email.unread ? 'text-black' : 'text-muted-foreground'}`}
                  >
                    {email.sender}
                  </span>
                  <span className="text-[9px] text-muted-foreground shrink-0">
                    {email.time}
                  </span>
                </div>
                <p
                  className={`text-[10px] truncate ${email.unread ? 'text-black font-medium' : 'text-muted-foreground'}`}
                >
                  {email.subject}
                </p>
                <p className="text-[10px] text-muted-foreground truncate mt-0.5">
                  {email.preview}
                </p>
                <span
                  className={`inline-block text-[9px] font-semibold mt-1.5 px-1.5 py-0.5 rounded-full border ${email.tagColor}`}
                >
                  {email.tag}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Email detail */}
        {selectedEmail ? (
          <div className="flex-1 overflow-y-auto">
            {/* Email header */}
            <div className="px-6 py-5 border-b border-border">
              <h3 className="text-[14px] font-bold text-black leading-tight mb-1">
                {selectedEmail.subject}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-6 h-6 rounded-full bg-primaryOrange/15 flex items-center justify-center shrink-0">
                  <span className="text-[9px] font-bold text-primaryOrange">
                    {selectedEmail.sender[0]}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-black">
                    {selectedEmail.sender}
                  </span>
                  <span className="text-[10px] text-muted-foreground ml-1.5">
                    &lt;{selectedEmail.from}&gt;
                  </span>
                </div>
                <span className="text-[10px] text-muted-foreground ml-auto shrink-0">
                  {selectedEmail.date} · {selectedEmail.time}
                </span>
              </div>
            </div>

            {/* Momentum action banner */}
            <div className="mx-6 mt-4 px-4 py-3 rounded-xl bg-[#0d0d1a] flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-primaryOrange flex items-center justify-center shrink-0">
                <span className="text-[9px] font-bold text-white">M</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-semibold text-white/60 uppercase tracking-wide">
                  Momentum
                </p>
                <p
                  className={`text-[11px] font-medium ${selectedEmail.actionColor}`}
                >
                  {selectedEmail.momentumAction}
                </p>
              </div>
              <Zap size={12} className="text-primaryOrange shrink-0" />
            </div>

            {/* Email body */}
            <div className="px-6 py-5">
              <div className="bg-white rounded-xl border border-border p-5">
                <p className="text-[12px] text-black leading-relaxed whitespace-pre-wrap">
                  {selectedEmail.preview.replace('...', '')}
                  {'\n\n'}
                  {selectedEmail.id === 'e1' &&
                    `We need a rate for 1,200 kg of pharma goods 2–8°C GDP certified, door-to-door delivery, ASAP — Dubai (DXB) to Baghdad (BGW).\n\nCan you provide an all-in rate including customs clearance?\n\nBest regards,\nSarah Al Khatib\nProcurement Manager, Global Pharma MENA`}
                  {selectedEmail.id === 'e2' &&
                    `Hi, we are looking for competitive rates on a 40HC container from Shenzhen (CNSZX) to Jebel Ali (AEJEA).\n\nExpected cargo: consumer electronics, 24 CBM, 8,000 kg.\nReady date: June 15.\n\nPlease include transit time and free demurrage days.\n\nRegards,\nKhaled Mansoor\nLogistics, AeroTrade LLC`}
                  {selectedEmail.id === 'e3' &&
                    `Thank you for the quote. We confirm the booking for 800 kg on the Emirates SkyCargo flight from Mumbai to Dubai.\n\nPlease issue the Air Waybill to:\nMedSupply MENA FZE\nRef: MEDS-2026-0529\n\nKind regards,\nOps Team`}
                  {selectedEmail.id === 'e4' &&
                    `Dear team, we are evaluating freight forwarders for a regular lane between Osaka (JPOSA) and Rotterdam (NLRTM) via Dubai.\n\nVolume: 2 x 20GP per month.\nCommodity: automotive components.\n\nCould you provide indicative rates and your transit time?\n\nSincerely,\nHiroshi Tanaka\nTanaka Trading Co.`}
                  {selectedEmail.id === 'e5' &&
                    `Following our call last week, could you confirm the rate for 800 kg automotive parts (DG class 3) from Frankfurt (FRA) to Dubai (DXB) via air?\n\nWe need the rate to hold until end of June.\n\nBest,\nHans Müller\nMüller GmbH`}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="px-6 pb-6 space-y-3">
              {/* Quick action chips */}
              <div className="flex flex-wrap gap-2">
                {[
                  { icon: MessageCircle, label: 'Add to Leads pipeline' },
                  { icon: Reply, label: 'Draft reply with Momentum' },
                  { icon: Calendar, label: 'Schedule follow-up' },
                  { icon: Package, label: 'Create rate quote' },
                ].map(({ icon: Icon, label }) => (
                  <button
                    key={label}
                    className="flex items-center gap-1.5 text-[11px] font-medium text-primaryOrange border border-primaryOrange/25 rounded-full px-3 py-1.5 hover:bg-primaryOrange/5 transition-colors"
                  >
                    <Icon size={10} strokeWidth={2} />
                    {label}
                  </button>
                ))}
              </div>

              {/* Reply composer */}
              <div className="bg-white rounded-xl border border-border p-4 space-y-3">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-primaryOrange flex items-center justify-center">
                    <span className="text-[7px] font-bold text-white">M</span>
                  </span>
                  Momentum — draft reply
                </p>
                <textarea
                  rows={4}
                  defaultValue={
                    selectedEmail.id === 'e1'
                      ? `Dear Sarah,\n\nThank you for your inquiry. We specialize in cold chain pharmaceutical logistics (2–8°C GDP certified) on the Dubai → Baghdad corridor.\n\nAll-in rate: $2,100–$2,400 USD · Transit: 4–5 days · CO₂e: ~52 kg (GLEC v3.1)\n\nWe can arrange customs clearance at both ends. Shall I confirm the booking?`
                      : selectedEmail.id === 'e2'
                        ? `Dear Khaled,\n\nWe'd be happy to quote the Shenzhen → Jebel Ali FCL.\n\nMaersk AE-1/Shogun: $1,950 USD (40HC) · Transit: 22–26 days · 14 days free demurrage\nMSC JADE: $1,880 USD (40HC) · Transit: 23–27 days · 14 days free demurrage\n\nCO₂e: ~18 kg/tonne (GLEC v3.1)\n\nBoth include port charges at CNSZX and AEJEA. Ready to confirm?`
                        : `Dear ${selectedEmail.sender.split(' ')[0]},\n\nThank you for your message. I am reviewing the details and will come back to you shortly with a competitive rate.\n\nBest regards,\nFreight Forwarding Co. · Powered by Goods2Load`
                  }
                  className="w-full text-[11px] px-3 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-1 focus:ring-primaryOrange/40 bg-gray-50 resize-none leading-relaxed"
                />
                <div className="flex items-center justify-between">
                  <p className="text-[9px] text-muted-foreground">
                    Includes live carrier rates + GLEC CO₂e
                  </p>
                  <button className="flex items-center gap-1.5 text-[11px] font-semibold bg-primaryOrange text-white px-4 py-1.5 rounded-lg hover:opacity-90 transition-opacity">
                    <ChevronRight size={12} />
                    Send via email
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-2">
              <Mail size={32} className="text-border mx-auto" />
              <p className="text-[12px] text-muted-foreground">
                Select an email to view
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom — what Momentum does */}
      {!selected && (
        <div className="px-6 pb-6">
          <div className="bg-white rounded-xl border border-border p-5">
            <h3 className="text-[11px] font-semibold text-black uppercase tracking-wider mb-3">
              What Momentum does with your email
            </h3>
            <div className="space-y-3">
              {[
                {
                  icon: Zap,
                  text: 'Reads every incoming email and detects freight inquiries automatically',
                },
                {
                  icon: Package,
                  text: 'Converts inquiries to leads in your pipeline — zero manual entry',
                },
                {
                  icon: Reply,
                  text: 'Drafts replies with live carrier rates and CO₂ estimates included',
                },
                {
                  icon: Calendar,
                  text: 'Creates calendar events for confirmed bookings and follow-ups',
                },
                {
                  icon: CheckCircle,
                  text: 'Links email threads to existing leads so full context stays in one place',
                },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-primaryOrange/8 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={11} className="text-primaryOrange" />
                  </div>
                  <p className="text-[12px] text-muted-foreground leading-relaxed">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
