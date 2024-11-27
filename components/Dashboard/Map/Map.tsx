import React, { useState } from 'react';

import {
  ComposableMap,
  Geographies,
  Geography,
  Line,
  Marker,
} from 'react-simple-maps';

interface MarkerCoordinates {
  name: string;
  coordinates: [number, number];
}

export interface MarkersCoordinates {
  from: MarkerCoordinates;
  to: MarkerCoordinates | null;
}

const Map = ({
  data,
  isTooltip = false,
  width,
  height,
}: {
  data: MarkersCoordinates[];
  isTooltip?: boolean;
  width?: number;
  height?: number;
}) => {
  const [hoveredMarkerIndex, setHoveredMarkerIndex] = useState<number | null>(
    null,
  );

  const handleMarkerHover = (index: number) => {
    setHoveredMarkerIndex(index);
  };

  return (
    <div className="max-w-[800px] pt-6 overflow-x-scroll overflow-y-hidden mt-4 mx-auto max-h-[514px]">
      <div className="scale-[1.75] lg:scale-[1]">
        <ComposableMap
          width={width || 1000}
          height={height || 900}
          projection="geoMercator"
        >
          <defs>
            <pattern
              id="pattern"
              patternUnits="userSpaceOnUse"
              width="5"
              height="5"
            >
              <path
                d="M2.51729 4.30509C3.70366 4.30509 4.6654 3.34171 4.6654 2.15334C4.6654 0.964959 3.70366 0.00158691 2.51729 0.00158691C1.33092 0.00158691 0.369141 0.964959 0.369141 2.15334C0.369141 3.34171 1.33092 4.30509 2.51729 4.30509Z"
                fill="#FFC1A2"
              />
            </pattern>
          </defs>

          <Geographies geography="/geo.json">
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="url(#pattern)"
                  stroke=""
                  style={{
                    default: { outline: 'none' },
                    hover: { outline: 'none' },
                    pressed: { outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>

          {data.map(({ from, to }, index) => (
            <>
              {to && (
                <Line
                  key={index}
                  from={from.coordinates}
                  to={to.coordinates}
                  stroke="url(#gradient)"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              )}
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop
                    offset="20%"
                    style={{ stopColor: '#FF6720', stopOpacity: 1 }}
                  />
                  <stop
                    offset="50%"
                    style={{ stopColor: '#FFFFFF', stopOpacity: 1 }}
                  />
                  <stop
                    offset="80%"
                    style={{ stopColor: '#FF6720', stopOpacity: 1 }}
                  />
                </linearGradient>
              </defs>
            </>
          ))}

          {data.map(({ from }, index) => (
            <Marker key={from.name} coordinates={from.coordinates}>
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                y="-8"
                x="-9"
                z="1000"
                onMouseEnter={() => handleMarkerHover(index)}
                onMouseLeave={() => setHoveredMarkerIndex(null)}
              >
                <circle cx="10.2814" cy="10.4876" r="9.54901" fill="#FF6720" />
                <circle
                  cx="10.2817"
                  cy="10.4876"
                  r="7.02191"
                  fill="#FF6720"
                  stroke="white"
                />
              </svg>

              {hoveredMarkerIndex === index || isTooltip ? (
                <svg
                  opacity={1}
                  x="-80"
                  y="-58"
                  fill="white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_60_3059)">
                    <rect
                      x="3.06641"
                      y="6.97296"
                      height="34.0594"
                      rx="5"
                      width={`${
                        from.name.length * 7 + 10 < 100
                          ? 100
                          : from.name.length * 7 + 10
                      }`}
                    />
                    <text
                      x={`${
                        (from.name.length * 7 + 10 < 100
                          ? 100
                          : from.name.length * 7 + 10) /
                          2 +
                        3.06641
                      }`}
                      y="26"
                      fill="black"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      style={{
                        fontSize: '14px',
                      }}
                    >
                      {from.name}
                    </text>
                    <path
                      d="M80.7097 51.1369L74.2896 40.0169L87.1298 40.0169L80.7097 51.1369Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_60_3059"
                      x="0.0664062"
                      y="0.972961"
                      height="60.164"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dx="5" dy="2" />
                      <feGaussianBlur stdDeviation="4" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_60_3059"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_60_3059"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
              ) : null}
            </Marker>
          ))}
        </ComposableMap>
      </div>
    </div>
  );
};

export default Map;
