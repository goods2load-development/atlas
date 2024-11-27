import { getRandomHexColor } from '@/lib/utils';

import React, { useEffect, useState } from 'react';

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

const IndustryChart = ({ data }: { data: IndustryData[] }) => {
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
  >(data.reduce((acc, item) => ({ ...acc, [item.industry]: true }), {}));

  useEffect(() => {
    if (data) {
      setSelectedIndustries(
        data.reduce((acc, item) => ({ ...acc, [item.industry]: true }), {}),
      );
    }
  }, [data]);

  const transformedData: TransformedData[] = months.map((month, index) => {
    const monthData: TransformedData = { month };
    data.forEach((item) => {
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
        {data.map((item) => (
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
        <div className="ml-auto flex-1 lg:min-w-[800px] h-[200px] lg:h-[400px] w-full overflow-scroll">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={transformedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis interval={0} dataKey="month" />
              <YAxis
                domain={[
                  Math.min(...data.flatMap((item) => item.months)),
                  Math.max(...data.flatMap((item) => item.months)),
                ]}
              />
              <Tooltip />

              {data.map(
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
