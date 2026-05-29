'use client';

import { Calendar, Clock, Link2, MapPin, Package } from 'lucide-react';

const DEMO_EVENTS = [
  {
    day: 'Mon 2',
    time: '09:00',
    title: 'Shipment Pickup — DXB Warehouse',
    tag: 'Logistics',
    tagColor: 'bg-blue-50 text-blue-700 border-blue-100',
    dot: 'bg-blue-500',
  },
  {
    day: 'Mon 2',
    time: '14:00',
    title: 'Client Call — Pharma Iraq Rate Review',
    tag: 'Sales',
    tagColor: 'bg-primaryOrange/8 text-primaryOrange border-primaryOrange/20',
    dot: 'bg-primaryOrange',
  },
  {
    day: 'Tue 3',
    time: '10:30',
    title: 'FCL Delivery Confirmation — Jebel Ali',
    tag: 'Operations',
    tagColor: 'bg-green-50 text-green-700 border-green-100',
    dot: 'bg-green-500',
  },
  {
    day: 'Tue 3',
    time: '16:00',
    title: 'Momentum Lead Follow-up — GEODIS Inquiry',
    tag: 'Momentum',
    tagColor: 'bg-primaryOrange/8 text-primaryOrange border-primaryOrange/20',
    dot: 'bg-primaryOrange',
  },
  {
    day: 'Wed 4',
    time: '08:00',
    title: 'Air Freight Booking — Frankfurt to DXB',
    tag: 'Logistics',
    tagColor: 'bg-blue-50 text-blue-700 border-blue-100',
    dot: 'bg-blue-500',
  },
  {
    day: 'Thu 5',
    time: '11:00',
    title: 'New Shipper Onboarding — Cold Chain',
    tag: 'Momentum',
    tagColor: 'bg-primaryOrange/8 text-primaryOrange border-primaryOrange/20',
    dot: 'bg-primaryOrange',
  },
];

export default function CalendarSection() {
  return (
    <div className="flex flex-col h-full overflow-y-auto hide-scrollbar">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-border">
        <h2 className="text-lg font-bold text-black">Calendar</h2>
        <p className="text-[12px] text-muted-foreground">
          Momentum monitors your schedule and coordinates freight activities
          automatically
        </p>
      </div>

      <div className="p-6 space-y-5">
        {/* Connect CTA */}
        <div className="bg-[#0d0d1a] rounded-xl p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-primaryOrange/15 flex items-center justify-center shrink-0">
            <Calendar size={18} className="text-primaryOrange" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-white">
              Connect your Google Calendar
            </p>
            <p className="text-[11px] text-white/50 mt-0.5 leading-relaxed">
              When connected, Momentum monitors your schedule, auto-creates
              events for new shipments, and sends follow-up reminders when leads
              go quiet.
            </p>
            <button className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold text-primaryOrange border border-primaryOrange/30 rounded-full px-3 py-1 hover:bg-primaryOrange/10 transition-colors">
              <Link2 size={10} /> Connect calendar — go live
            </button>
          </div>
          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/20 shrink-0">
            DEMO
          </span>
        </div>

        {/* Weekly preview */}
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <div className="px-5 py-3 border-b border-border flex items-center justify-between">
            <p className="text-[11px] font-semibold text-black uppercase tracking-wider">
              This week — June 2–6
            </p>
            <span className="text-[10px] text-muted-foreground">
              4 Momentum-generated events
            </span>
          </div>

          <div className="divide-y divide-border">
            {DEMO_EVENTS.map((ev, i) => (
              <div key={i} className="flex items-start gap-4 px-5 py-3.5">
                <div className="w-14 shrink-0">
                  <p className="text-[10px] font-semibold text-muted-foreground">
                    {ev.day}
                  </p>
                  <p className="text-[11px] font-bold text-black flex items-center gap-1 mt-0.5">
                    <Clock size={9} className="text-muted-foreground" />{' '}
                    {ev.time}
                  </p>
                </div>
                <div
                  className={`w-1.5 h-1.5 rounded-full ${ev.dot} mt-1.5 shrink-0`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-medium text-black leading-tight">
                    {ev.title}
                  </p>
                  <span
                    className={`inline-block text-[9px] font-semibold mt-1 px-2 py-0.5 rounded-full border ${ev.tagColor}`}
                  >
                    {ev.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What Atlas does */}
        <div className="bg-white rounded-xl border border-border p-5">
          <h3 className="text-[11px] font-semibold text-black uppercase tracking-wider mb-3">
            What Momentum does with your calendar
          </h3>
          <div className="space-y-3">
            {[
              {
                icon: Package,
                text: 'Auto-creates shipment events from confirmed bookings',
              },
              {
                icon: Clock,
                text: 'Sends follow-up reminders 48h after unanswered leads',
              },
              {
                icon: MapPin,
                text: 'Flags scheduling conflicts with active freight routes',
              },
              {
                icon: Calendar,
                text: 'Books client calls when shipper requests a rate review',
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
    </div>
  );
}
