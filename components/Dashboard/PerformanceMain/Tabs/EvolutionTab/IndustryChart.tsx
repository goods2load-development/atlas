import { getRandomHexColor } from '@/lib/utils';

import React, { useState } from 'react';

import Image from 'next/image';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface IndustryData {
  industry: string;
  months: number[];
}

interface TransformedData {
  [key: string]: string | number;
  month: string;
}

const IndustryChart: React.FC = ({ data }: any) => {
  const initialData: IndustryData[] = [
    {
      industry: 'Industry_1',
      months: [13, 2, 2, 20, 4, 17, 19, 20, 11, 3, 12, 20],
    },
    {
      industry: 'Industry_2',
      months: [17, 9, 2, 2, 20, 7, 9, 19, 11, 11, 1, 6],
    },
    {
      industry: 'Industry_3',
      months: [9, 18, 18, 20, 3, 9, 11, 11, 16, 12, 13, 13],
    },
    {
      industry: 'Industry_4',
      months: [11, 11, 20, 8, 13, 8, 4, 9, 6, 14, 9, 14],
    },
    {
      industry: 'Industry_5',
      months: [1, 14, 17, 12, 12, 19, 12, 7, 15, 3, 10, 19],
    },
  ];

  const months: string[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const [selectedIndustries, setSelectedIndustries] = useState<
    Record<string, boolean>
  >(initialData.reduce((acc, item) => ({ ...acc, [item.industry]: true }), {}));

  const transformedData: TransformedData[] = months.map((month, index) => {
    const monthData: TransformedData = { month };
    initialData.forEach((item) => {
      if (selectedIndustries[item.industry]) {
        monthData[item.industry] = item.months[index];
      }
    });
    return monthData;
  });

  const handleCheckboxChange = (industry: string) => {
    setSelectedIndustries((prev) => ({
      ...prev,
      [industry]: !prev[industry],
    }));
  };

  return (
    <div className="mt-6 bg-[#FFF] lg:p-9 p-4 rounded-[9px]">
      <div className="flex justify-between items-center mb-6">
        <span className="font-[500] md:text-[20px] leading-[22px] text-[#29292A] w-full lg:w-auto mb-2 sm:mb-3 text-center lg:text-left">
          Industry solutions searchings per year
        </span>
        <div className="flex items-center gap-2 md:gap-8 text-[18px] font-[500] text-[#46474C]">
          <Select>
            <div className="w-[80px] md:w-[180px] h-[35px] bg-white border-none rounded-[8px] px-2 md:px-[20px] text-black">
              <SelectTrigger>
                <SelectValue placeholder="1 year" />
              </SelectTrigger>
            </div>
            <SelectContent>
              <SelectItem value="1 year">1 year</SelectItem>
              <SelectItem value="2 year">2 year</SelectItem>
              <SelectItem value="3 year">3 year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-wrap mb-4 gap-4">
        {initialData.map((item) => (
          <label
            key={item.industry}
            className="flex items-center gap-2 text-[#29292A]"
          >
            <Checkbox
              checked={selectedIndustries[item.industry]}
              onCheckedChange={() => handleCheckboxChange(item.industry)}
            />
            {item.industry}
          </label>
        ))}
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
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={transformedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis interval={0} dataKey="month" />
              <YAxis
                domain={[
                  Math.min(...initialData.flatMap((item) => item.months)),
                  Math.max(...initialData.flatMap((item) => item.months)),
                ]}
              />
              <Tooltip />

              {initialData.map(
                (item, index) =>
                  selectedIndustries[item.industry] && (
                    <Line
                      key={item.industry}
                      strokeWidth={2}
                      type="monotone"
                      dataKey={item.industry}
                      stroke={getRandomHexColor()}
                      activeDot={{ r: 8 }}
                    />
                  ),
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default IndustryChart;
