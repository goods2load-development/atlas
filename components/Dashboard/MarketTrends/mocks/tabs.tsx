import {
  MarketTrendsTab,
  MarketTrendsTabData,
} from "@/components/Dashboard/MarketTrends/MarketTrendsTab";

import { type Tab } from "../MarketTrendsMain";

import TabPieInfo from "../Tabs/TabPieInfo";

import { PieData } from "../../Charts/PieChart";
import BarChartGraph, { BarChartData } from "../../Charts/BarChart";
import { MapDetails } from "../Tabs/TabMapDetails";

import TabJourneyDuration, {
  JourneyDurationData,
} from "../Tabs/TabJourneyDuration";

import Map, { MarkersCoordinates } from "../../Map/Map";
import TabMapDetails from "../Tabs/TabMapDetails";

const tab1Data: MarketTrendsTabData<MapDetails[]> & { markers: any } = {
  data: [
    { name: "DUBAI-INDIA", value: 54, color: "#FF6720" },
    { name: "DUBAI-VIETNAM", value: 26, color: "#834629" },
    { name: "DUBAI-SAUDI ARABIA", value: 20, color: "#FDA074" },
  ],
  title: "Most frequent route",
  markers: [
    {
      from: {
        name: "India",
        coordinates: [76.4737, 27.2304],
      },
      to: {
        name: "Vietnam",
        coordinates: [104.4737, 16.2304],
      },
    },
    {
      from: {
        name: "Dubai, UAE",
        coordinates: [53.4737, 25.2304],
      },
      to: {
        name: "India",
        coordinates: [76.4737, 27.2304],
      },
    },
    {
      from: {
        name: "Saudi Arabia",
        coordinates: [40.4737, 25.2004],
      },
      to: {
        name: "Dubai, UAE",
        coordinates: [53.4737, 25.2304],
      },
    },
    {
      from: {
        name: "Vietnam",
        coordinates: [104.4737, 16.2304],
      },
      to: null,
    },
  ],
};

const tab2Data: MarketTrendsTabData<PieData[]> = {
  data: [
    { name: "Raw material", value: 38, color: "#F4BE37" },
    { name: "Furniture", value: 32, color: "#3F2011" },
    {
      name: "Electronics",
      value: 22,
      color: "#FB5304",
    },
    { name: "Cars parts and cars", value: 24, color: "#FF6720" },
    { name: "Other", value: 2, color: "#692607" },
    { name: "Clothes", value: 5, color: "#FF9F40" },
  ],
  title: "Top transported goods",
  description: "the most popular goods transported by your company",
};

const tab3Data: MarketTrendsTabData<BarChartData[]> = {
  data: [
    {
      name: "MON",
      value: 52,
      color: "#FFBD18",
    },
    {
      name: "TUE",
      value: 75,
      color: "#FFA800",
    },
    {
      name: "WED",
      value: 40,
      color: "#FF7F00",
    },
    {
      name: "THU",
      value: 110,
      color: "#FF6720",
    },
    {
      name: "FRI",
      value: 80,
      color: "#FF5620",
    },
    {
      name: "SAT",
      value: 40,
      color: "#FB5304",
    },
    {
      name: "SUN",
      value: 20,
      color: "#FB3004",
    },
  ],
  title: "Most frequent day",
  description:
    "demand for cargo transportation depending on the day of the week",
};

const tab4Data: MarketTrendsTabData<BarChartData[]> & JourneyDurationData = {
  data: [
    {
      name: "Dubai",
      value: 43,
      color: "#FFBD18",
    },
    {
      name: "India",
      value: 125,
      color: "#FF9F40",
    },
    {
      name: "Vietnam",
      value: 13,
      color: "#FF6720",
    },
    {
      name: "Saudi Arabia",
      value: 50,
      color: "#FB5304",
    },
  ],
  title: "Journey duration",
  description: "Past journey durations are depicted in the data chart.",
  country: "DUBAI",
  countries: [
    {
      country: "INDIA",
      days: 23,
      color: "#FF6720",
    },
    {
      country: "VIETNAM",
      days: 10,
      color: "#FF6720",
    },
    {
      country: "ITALY",
      days: 36,
      color: "#834629",
    },
    {
      country: "SHANGHAI",
      days: 23,
      color: "#834629",
    },
  ],
};

const tab5Data: MarketTrendsTabData<[]> & { markers: MarkersCoordinates[] } = {
  data: [],
  title: "Top departure point",
  markers: [
    {
      from: {
        name: "Genoa, Italy",
        coordinates: [10.4737, 45.2304],
      },
      to: null,
    },
    {
      from: {
        name: "Port Said, Egypt",
        coordinates: [30.4737, -25.2304],
      },
      to: null,
    },
    {
      from: {
        name: "Port of Durban, South Africa",
        coordinates: [25.4737, 35.2304],
      },
      to: null,
    },
    {
      from: {
        name: "Port of Jebel Ali, UAE",
        coordinates: [50.4737, 27.2304],
      },
      to: null,
    },
    {
      from: {
        name: "Shanghai port, China",
        coordinates: [117.4737, 35.2304],
      },
      to: null,
    },
  ],
};

const tab6Data: MarketTrendsTabData<PieData[]> = {
  data: [
    { name: "10", value: 20, color: "#F4BE37" },
    { name: "9-8", value: 20, color: "#692607" },
    { name: "7-6", value: 20, color: "#FF6720" },
    { name: "5-4", value: 20, color: "#3F2011" },
    {
      name: "3-2",
      value: 15,
      color: "#FB5304",
    },
    { name: "1", value: 5, color: "#FF9F40" },
  ],
  title: "Service satisfaction rate from 1 to 10",
  description: "where 10 - excellent and 0 - unsatisfactory",
};

const tab7Data: MarketTrendsTabData<PieData[]> = {
  data: [
    { name: "Last minute booking", value: 34, color: "#F4BE37" },
    { name: "Dynamic Booking Changes", value: 32, color: "#FB5304" },
    {
      name: "Multi-Modal Booking",
      value: 20,
      color: "#FF9F40",
    },
    { name: "Advance booking", value: 15, color: "#3F2011" },
  ],
  title: "Booking behavior",
  description:
    "Understanding booking behavior is crucial for optimizing logistics efficiency and meeting customer demands effectively.",
};

const tab9Data: MarketTrendsTabData<PieData[]> = {
  data: [
    { name: "CPT", value: 20, color: "#F4BE37" },
    { name: "CIP", value: 20, color: "#692607" },
    {
      name: "DAP",
      value: 20,
      color: "#FF6720",
    },
    { name: "DDP", value: 20, color: "#3F2011" },
    { name: "FCA", value: 15, color: "#FB5304" },
    { name: "EXW", value: 5, color: "#FF9F40" },
  ],
  title: "Preferred Incoterms",
  description:
    "Each Incoterms rule clarifies the tasks, costs, and risks to be borne by buyers and sellers in these transactions. Familiarizing yourself with Incoterms will help improve smoother transactions by clearly defining who is responsible for what and each step of the transaction.",
};

const tab10Data: MarketTrendsTabData<PieData[]> = {
  data: [
    { name: "Summer", value: 34, color: "#F4BE37" },
    { name: "Autumm", value: 32, color: "#FB5304" },
    {
      name: "Winter",
      value: 20,
      color: "#FF9F40",
    },
    { name: "Spring", value: 15, color: "#3F2011" },
  ],
  title: "Seasonal variations",
  description: "changes in demand for services depending on the time of year",
};

export const tabsMocks: Tab[] = [
  {
    id: 1,
    text: "Most frequent route",
    element: (
      <>
        <MarketTrendsTab title={tab1Data.title}>
          <Map data={tab1Data.markers} />
        </MarketTrendsTab>
        <MarketTrendsTab>
          <TabMapDetails data={tab1Data.data} />
        </MarketTrendsTab>
      </>
    ),
  },
  {
    id: 2,
    text: "Top transported goods",
    element: (
      <MarketTrendsTab
        title={tab2Data.title}
        description={tab2Data.description}
      >
        <TabPieInfo data={tab2Data.data} />
      </MarketTrendsTab>
    ),
  },
  {
    id: 3,
    text: "Most frequent day",
    element: (
      <MarketTrendsTab
        title={tab3Data.title}
        description={tab3Data.description}
      >
        <div className="h-[300px] lg:h-[500px] w-full">
          <BarChartGraph data={tab3Data.data} />
        </div>
      </MarketTrendsTab>
    ),
  },
  {
    id: 4,
    text: "Journey duration",
    element: (
      <MarketTrendsTab
        title={tab4Data.title}
        description={tab4Data.description}
      >
        <TabJourneyDuration
          data={tab4Data.data}
          country={tab4Data.country}
          countries={tab4Data.countries}
        />
      </MarketTrendsTab>
    ),
  },
  {
    id: 5,
    text: "Top departure point",
    element: (
      <MarketTrendsTab title={tab5Data.title}>
        <Map data={tab5Data.markers} />
      </MarketTrendsTab>
    ),
  },
  {
    id: 6,
    text: "Service satisfaction",
    element: (
      <MarketTrendsTab
        title={tab6Data.title}
        description={tab6Data.description}
      >
        <TabPieInfo data={tab6Data.data} />
      </MarketTrendsTab>
    ),
  },
  {
    id: 7,
    text: "Booking behavior",
    element: (
      <MarketTrendsTab
        title={tab7Data.title}
        description={tab7Data.description}
      >
        <TabPieInfo data={tab7Data.data} />
      </MarketTrendsTab>
    ),
  },
  {
    id: 8,
    text: "Geographical trends",
    element: (
      <MarketTrendsTab title={tab1Data.title}>
        <Map data={tab1Data.markers} />
      </MarketTrendsTab>
    ),
  },
  {
    id: 9,
    text: "Preferred Incoterms",
    element: (
      <MarketTrendsTab
        title={tab9Data.title}
        description={tab9Data.description}
      >
        <TabPieInfo data={tab9Data.data} />
      </MarketTrendsTab>
    ),
  },
  {
    id: 10,
    text: "Seasonal variations",
    element: (
      <MarketTrendsTab
        title={tab10Data.title}
        description={tab10Data.description}
      >
        <TabPieInfo data={tab10Data.data} />
      </MarketTrendsTab>
    ),
  },
];
