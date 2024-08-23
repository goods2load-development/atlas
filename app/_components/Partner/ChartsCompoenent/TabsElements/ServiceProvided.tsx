"use client";

import PieChart, { PieData } from "@/components/Dashboard/Charts/PieChart";

export const ServiceProvided = ({ data }: { data: PieData[] }) => {
  return (
    <div className="flex gap-[46px]">
      <div className="w-[280px] h-[280px]">
        <PieChart data={data} />
      </div>

      <div className="mt-[30px] flex-1">
        <div className="font-medium border-b border-lightOrange pb-2 w-full mb-6">
          Services lines
        </div>

        <div>
          {data.map((elem) => {
            return (
              <div key={elem.name} className="flex gap-2 mb-4">
                <div
                  className="w-[24px] h-[24px] rounded-sm"
                  style={{ backgroundColor: elem.color }}
                ></div>
                <div>{elem.name}</div>
                <div className="ml-auto">{elem.value}%</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
