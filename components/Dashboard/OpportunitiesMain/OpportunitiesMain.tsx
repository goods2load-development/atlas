import BarChartGraph, { BarChartData } from "../Charts/BarChart";
import Map, { MarkersCoordinates } from "../Map/Map";

const MocksData: BarChartData[] = [
  { name: "Underserved routes", value: 160, color: "#FF6720" },
  { name: "Emerging trends", value: 195, color: "#BB4E1B" },
  {
    name: "Customer Segmentation",
    value: 60,
    color: "#FFEDE4",
  },
];

const MockMarkers: MarkersCoordinates[] = [
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
];

const OpportunitiesMain = () => {
  return (
    <>
      <div className="py-4 px-3 bg-white rounded-md mb-6 max-h-[775px] mt-6">
        <Map data={MockMarkers} />
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex flex-col justify-center gap-4 py-4 px-3 bg-white rounded-md">
          {MocksData.map((elem, index) => {
            return (
              <div
                key={index}
                className="flex items-center gap-2 px-2 py-1 bg-gray-50 w-[200px] sm:w-[241px] rounded-lg"
              >
                <div
                  className="min-w-[16px] min-h-[16px] rounded-full"
                  style={{ backgroundColor: elem.color }}
                ></div>
                <div className="uppercase text-sm whitespace-nowrap overflow-hidden">
                  {elem.name}
                </div>
              </div>
            );
          })}
        </div>
        <div className="py-4 px-3 bg-white rounded-md w-full h-[200px]">
          <BarChartGraph data={MocksData} grid={false} values={false} />
        </div>
      </div>
    </>
  );
};

export default OpportunitiesMain;
