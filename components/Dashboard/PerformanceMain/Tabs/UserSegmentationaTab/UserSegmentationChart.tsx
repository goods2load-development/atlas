import BarChartGraph, { BarChartData } from '../../../Charts/BarChart';

import Image from 'next/image';

const UserSegmentationChart = ({ data }: { data: any }) => {
  const dataWithColor = (data: any): BarChartData[] => {
    return data.map((elem: any, idx: number) => {
      return {
        ...elem,
        color: '#FF6720',
        name: elem.label,
      };
    });
  };

  return (
    <div className="mt-6 bg-[#FFF] lg:p-9 p-4 rounded-[9px] max-w-[1150px]">
      <div className="flex items-center sm:w-full w-[280px] overflow-x-scroll mx-auto">
        <div className="-mt-[20px] lg:-mt-[40px] min-w-[21px]">
          <Image
            width={21}
            height={141}
            alt="av-dm"
            src="/average-demand.svg"
          />
        </div>
        <div className="ml-auto flex-1 min-w-[800px] h-[200px] lg:h-[400px]">
          {data.length > 0 ? (
            <BarChartGraph
              data={dataWithColor(data)}
              values={true}
              barWidth={40}
            />
          ) : (
            <div className=" text-center h-full flex items-center justify-center">
              Data not found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSegmentationChart;
