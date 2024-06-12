import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

export interface MarkerType {
  markerOffset: number;
  name: string;
  coordinates: [number, number];
}

const MapChart = ({ data }: { data: MarkerType[] }) => {
  return (
    <div className="h-[514px] pt-6 overflow-hidden">
      <ComposableMap projection="geoMercator" width={1000} height={900}>
        <Geographies geography="/geo.json">
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#EAEAEC"
                stroke="#D6D6DA"
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none" },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>
        {data.map(({ name, coordinates, markerOffset }) => (
          <Marker key={name} coordinates={coordinates}>
            <text
              textAnchor="middle"
              y={markerOffset}
              style={{
                fontFamily: "system-ui",
                fill: "#5D5A6D",
                maxWidth: "100px",
              }}
            >
              {name}
            </text>
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
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
          </Marker>
        ))}
      </ComposableMap>
    </div>
  );
};

export default MapChart;
