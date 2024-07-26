import Image from "next/image";
import BarChartGraph, { BarChartData } from "../../Charts/BarChart";
import { ICompetitivenessiteItem } from "@/app/interface/dashboard";

const colors: string[] = ["#FFEDE4", "#FF6720", "#BB4E1B"];

const CompetitivenessTab = ({ data }: { data: ICompetitivenessiteItem[] }) => {
  const dataWithColor = (data: ICompetitivenessiteItem[]): BarChartData[] => {
    return data.map((elem: ICompetitivenessiteItem, idx: number) => {
      return {
        ...elem,
        color: colors[idx],
      };
    });
  };

  return (
    <div className="mt-6 bg-[#FFF] lg:p-9 p-4 rounded-[9px] max-w-[1150px]">
      <div className="flex gap-2 items-center sm:mb-14 mb-8 sm:justify-between justify-center flex-wrap xl:flex-nowrap">
        <span className="font-[500] md:text-[20px] leading-[22px] text-[#29292A] w-full lg:w-auto mb-2 sm:mb-3 text-center lg:text-left">
          Average demand
        </span>
        <div className="flex items-center gap-2 md:gap-8 text-[18px] font-[500] text-[#46474C]">
          {dataWithColor(data).map((elem, idx) => {
            return (
              <div
                key={elem.name}
                className="flex items-center gap-1 md:gap-3 text-sm md:text-base"
              >
                <span>{elem.name}</span>
                <div
                  className={`bg-[${elem.color}] w-4 h-4 sm:w-6 sm:h-6 rounded-md`}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
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
          <BarChartGraph
            data={dataWithColor(data)}
            values={false}
            barWidth={100}
          />
        </div>
      </div>
    </div>
  );
};

export default CompetitivenessTab;
