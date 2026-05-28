/**
 * Maersk Track & Trace Proxy — Layer 3 Carrier Agent
 * ===================================================
 * Proxies container / B/L tracking requests to the Maersk Track & Trace API.
 *
 * FREE tier: register an app at developer.maersk.com, get Consumer-Key,
 * set MAERSK_API_KEY in Vercel env → live tracking activates automatically.
 *
 * GET /api/maersk-track?ref=<containerNumber|billOfLading>
 */
import { NextRequest, NextResponse } from 'next/server';

export const revalidate = 0;

const MAERSK_TRACK_URL =
  'https://api.maersk.com/track-and-trace-private/v2/events';

export async function GET(req: NextRequest) {
  const ref =
    new URL(req.url).searchParams.get('ref')?.trim().toUpperCase() ?? '';
  if (!ref) {
    return NextResponse.json({ error: 'ref param required' }, { status: 400 });
  }

  const apiKey = process.env.MAERSK_API_KEY;

  if (apiKey) {
    try {
      // Maersk Track & Trace — free tier, DCSA standard
      const url = new URL(MAERSK_TRACK_URL);
      // Try as container number first, then B/L
      url.searchParams.set('equipmentReference', ref);
      const res = await fetch(url.toString(), {
        headers: {
          'Consumer-Key': apiKey,
          Accept: 'application/json',
        },
        signal: AbortSignal.timeout(10_000),
      });

      if (res.ok) {
        const data = (await res.json()) as {
          events?: {
            eventType?: string;
            eventClassifierCode?: string;
            transportEventTypeCode?: string;
            location?: { locationName?: string };
            eventDateTime?: string;
          }[];
        };
        const events = data.events ?? [];
        if (events.length > 0) {
          const latest = events[events.length - 1];
          const status =
            latest.transportEventTypeCode ?? latest.eventType ?? 'In transit';
          const location = latest.location?.locationName ?? 'Unknown location';
          const timestamp = latest.eventDateTime
            ? new Date(latest.eventDateTime).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })
            : '';
          return NextResponse.json({
            ref,
            status,
            location,
            timestamp,
            source: 'maersk_api',
            totalEvents: events.length,
          });
        }
        return NextResponse.json({
          ref,
          status: 'No events found',
          source: 'maersk_api',
        });
      }

      // API error — fall through to demo response
      console.warn('[MaerskTrack] API returned', res.status);
    } catch (e) {
      console.warn('[MaerskTrack] API unavailable:', e);
    }
  }

  // No key or API unavailable — return instructional response
  return NextResponse.json(
    {
      ref,
      status: 'MAERSK_API_KEY not configured',
      location:
        'Register at developer.maersk.com → Track & Trace → Create App → Copy Consumer-Key',
      timestamp: '',
      source: 'no_key',
      setupUrl:
        'https://developer.maersk.com/api-catalogue/Track%20and%20Trace',
    },
    { status: 200 },
  );
}
