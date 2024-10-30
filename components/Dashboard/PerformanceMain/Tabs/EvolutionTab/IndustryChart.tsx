import React from 'react';

import Image from 'next/image';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export interface IIndustryChart {
  name: string;
  currentYear: number;
  lastYear: number;
  amt: number;
}

const IndustryChart = ({ data }: { data: IIndustryChart[] }) => {
  return (
    <div className="mt-6 bg-[#FFF] lg:p-9 p-4 rounded-[9px]">
      <div className="flex justify-between items-center mb-6">
        <span className="font-[500] md:text-[20px] leading-[22px] text-[#29292A] w-full lg:w-auto mb-2 sm:mb-3 text-center lg:text-left">
          Industry solutions searchings per year
        </span>
        <div className="flex items-center gap-2 md:gap-8 text-[18px] font-[500] text-[#46474C]">
          <div className="flex items-center gap-1 md:gap-3 text-sm md:text-base">
            <span>This year</span>
            <div className="bg-[#FF6720] w-4 h-4 sm:w-6 sm:h-6 rounded-md"></div>
          </div>
          <div className="flex items-center gap-1 md:gap-3 text-sm md:text-base">
            <span>Last year</span>
            <div className="bg-[#F9B21C] w-4 h-4 sm:w-6 sm:h-6 rounded-md"></div>
          </div>
        </div>
      </div>

      <div className="flex items-center sm:w-full mx-auto">
        <div className="-mt-[20px] lg:-mt-[40px] min-w-[21px] max-w-[1050px]">
          <Image
            width={21}
            height={141}
            alt="av-dm"
            src="/average-demand.svg"
          />
        </div>
        <div className="ml-auto flex-1 min-w-[800px] h-[200px] lg:h-[400px] sm:min-w-full overflow-scroll">
          <ResponsiveContainer width="300%" height="100%">
            <LineChart width={1000} height={300} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" interval={0} />
              <YAxis />
              <Tooltip />
              <Line
                strokeWidth={2}
                type="monotone"
                dataKey="currentYear"
                stroke="#FF6720"
                activeDot={{ r: 8 }}
              />
              <Line
                strokeWidth={2}
                type="monotone"
                dataKey="lastYear"
                stroke="#F9B21C"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default IndustryChart;
