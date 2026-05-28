// @ts-nocheck
'use client';

import {
  ComposableMap,
  Geographies,
  Geography,
  Line,
  Marker,
} from 'react-simple-maps';

// @ts-nocheck

// @ts-nocheck

// @ts-nocheck

// @ts-nocheck

// @ts-nocheck

// @ts-nocheck

// @ts-nocheck

// @ts-nocheck

// @ts-nocheck

// @ts-nocheck

// @ts-nocheck

// @ts-nocheck

// @ts-nocheck

// @ts-nocheck

// @ts-nocheck

// @ts-nocheck

// @ts-nocheck

// @ts-nocheck

// @ts-nocheck

// @ts-nocheck

// @ts-nocheck

// @ts-nocheck

// @ts-nocheck

// @ts-nocheck

// @ts-nocheck

// @ts-nocheck

// @ts-nocheck

// @ts-nocheck

// @ts-nocheck

// @ts-nocheck

// @ts-nocheck

// @ts-nocheck

// @ts-nocheck

// @ts-nocheck

// @ts-nocheck

// @ts-nocheck

// @ts-nocheck

// @ts-nocheck

// @ts-nocheck

// @ts-nocheck

// @ts-nocheck

// @ts-nocheck

// @ts-nocheck

// @ts-nocheck

// @ts-nocheck

// @ts-nocheck

// @ts-nocheck

const LANES = [
  {
    from: {
      name: 'Dubai',
      code: 'DXB',
      coords: [55.27, 25.2] as [number, number],
    },
    to: {
      name: 'Frankfurt',
      code: 'FRA',
      coords: [8.68, 50.11] as [number, number],
    },
    mode: 'AIR',
  },
  {
    from: {
      name: 'Jebel Ali',
      code: 'JEA',
      coords: [55.03, 24.99] as [number, number],
    },
    to: {
      name: 'Shanghai',
      code: 'SHA',
      coords: [121.47, 31.23] as [number, number],
    },
    mode: 'SEA',
  },
  {
    from: {
      name: 'Dubai',
      code: 'DXB',
      coords: [55.27, 25.2] as [number, number],
    },
    to: {
      name: 'Mumbai',
      code: 'BOM',
      coords: [72.88, 19.08] as [number, number],
    },
    mode: 'AIR',
  },
  {
    from: {
      name: 'Dubai',
      code: 'DXB',
      coords: [55.27, 25.2] as [number, number],
    },
    to: {
      name: 'Riyadh',
      code: 'RUH',
      coords: [46.72, 24.69] as [number, number],
    },
    mode: 'ROAD',
  },
];

const MODE_COLOR: Record<string, string> = {
  AIR: '#FF6720',
  SEA: '#38bdf8',
  ROAD: '#fbbf24',
};

/** Quadratic bezier: 20 segments to simulate a smooth arc */
function arcPoints(
  from: [number, number],
  to: [number, number],
): [number, number][] {
  const midLon = (from[0] + to[0]) / 2;
  const midLat = (from[1] + to[1]) / 2;
  const span = Math.sqrt(
    Math.pow(to[0] - from[0], 2) + Math.pow(to[1] - from[1], 2),
  );
  const ctrlLat = midLat + span * 0.22;
  const N = 24;
  const pts: [number, number][] = [];
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const lon =
      (1 - t) * (1 - t) * from[0] + 2 * (1 - t) * t * midLon + t * t * to[0];
    const lat =
      (1 - t) * (1 - t) * from[1] + 2 * (1 - t) * t * ctrlLat + t * t * to[1];
    pts.push([lon, lat]);
  }
  return pts;
}

// Per-city label offsets to avoid crowding in the Gulf cluster
const LABEL_OFFSET: Record<string, { x: number; y: number; anchor: string }> = {
  DXB: { x: 6, y: -10, anchor: 'start' }, // Dubai — up-right
  JEA: { x: -6, y: 12, anchor: 'end' }, // Jebel Ali — down-left
  RUH: { x: -8, y: -10, anchor: 'end' }, // Riyadh — up-left
  FRA: { x: 0, y: -10, anchor: 'middle' }, // Frankfurt — up
  SHA: { x: 6, y: -10, anchor: 'start' }, // Shanghai — up-right
  BOM: { x: 6, y: -10, anchor: 'start' }, // Mumbai — up-right
};

/** Collect unique city dots, dedup by code */
function uniqueCities() {
  const seen = new Set<string>();
  const cities: { name: string; code: string; coords: [number, number] }[] = [];
  for (const lane of LANES) {
    for (const city of [lane.from, lane.to]) {
      if (!seen.has(city.code)) {
        seen.add(city.code);
        cities.push(city);
      }
    }
  }
  return cities;
}

export default function AtlasLaneMap() {
  return (
    <div className="rounded-xl overflow-hidden bg-[#0d111c]">
      {/* Legend */}
      <div className="flex items-center gap-5 px-4 pt-3 pb-1">
        {Object.entries(MODE_COLOR).map(([mode, color]) => (
          <div key={mode} className="flex items-center gap-1.5">
            <span
              className="inline-block w-5 h-[2px] rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="text-[10px] font-semibold text-white/50 tracking-widest">
              {mode}
            </span>
          </div>
        ))}
        <span className="ml-auto text-[10px] text-white/30 font-medium">
          {LANES.length} active lanes
        </span>
      </div>

      <ComposableMap
        width={760}
        height={320}
        projection="geoMercator"
        projectionConfig={{ scale: 120, center: [50, 28] }}
        style={{ width: '100%', height: 'auto' }}
      >
        {/* Country fills */}
        <Geographies geography="/geo.json">
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#1a2235"
                stroke="#0d111c"
                strokeWidth={0.5}
                style={{
                  default: { outline: 'none' },
                  hover: { outline: 'none' },
                  pressed: { outline: 'none' },
                }}
              />
            ))
          }
        </Geographies>

        {/* Curved arcs */}
        {LANES.map((lane, i) => (
          <Line
            key={i}
            coordinates={arcPoints(lane.from.coords, lane.to.coords)}
            stroke={MODE_COLOR[lane.mode]}
            strokeWidth={1.4}
            strokeOpacity={0.85}
            strokeLinecap="round"
            fill="none"
          />
        ))}

        {/* City dots + labels */}
        {uniqueCities().map((city) => {
          const off = LABEL_OFFSET[city.code] ?? {
            x: 0,
            y: -10,
            anchor: 'middle',
          };
          return (
            <Marker key={city.code} coordinates={city.coords}>
              {/* Outer glow ring */}
              <circle r={5} fill="#FF6720" fillOpacity={0.15} />
              {/* Dot */}
              <circle r={3} fill="#FF6720" stroke="#0d111c" strokeWidth={1} />
              {/* Label */}
              <text
                x={off.x}
                y={off.y}
                textAnchor={off.anchor}
                style={{
                  fontFamily: 'inherit',
                  fontSize: '8px',
                  fontWeight: 600,
                  fill: 'rgba(255,255,255,0.8)',
                  letterSpacing: '0.05em',
                  pointerEvents: 'none',
                }}
              >
                {city.code}
              </text>
            </Marker>
          );
        })}
      </ComposableMap>
    </div>
  );
}
