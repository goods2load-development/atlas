import BarChartGraph, { BarChartData } from "../../Charts/BarChart";
import TabBarChart from "./TabBarChart";
import TabMap from "./TabMap";

const TabUnderSurvedRoutes = ({ data }: { data: BarChartData[] }) => {
  return (
    <div className="flex gap-6">
      <div className="flex flex-col gap-4 py-8 px-6 bg-white rounded-md">
        {data.map((elem, index) => {
          return (
            <div
              key={index}
              className="flex items-start gap-2 px-2 py-1 bg-gray-50 w-[241px] rounded-lg"
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
      <div className="py-8 px-6 bg-white rounded-md w-full h-[200px]">
        <BarChartGraph data={data} grid={false} values={false} />
      </div>
    </div>
  );
};

export default TabUnderSurvedRoutes;
