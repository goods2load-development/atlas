import BarChartGraph, { BarChartData } from "../../Charts/BarChart";

const TabBarChart = ({ data }: { data: BarChartData[] }) => {
  return (
    <div className="w-full h-[500px]">
      <BarChartGraph data={data} />
    </div>
  );
};

export default TabBarChart;
