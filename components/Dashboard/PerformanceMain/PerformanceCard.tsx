import { subYears } from "date-fns";
import { cn } from "@/lib/utils";

import { useEffect, useState } from "react";
import { Triangle } from "lucide-react";

export interface ICardData {
  average: string | number
  lastYear: string | number
}

export enum CardType {
  AVARAGE = "avarage",
  USER_SEGMENTATION = "user_segmentation"
}

export interface ICard {
  label: string;
  type?: CardType;
  data: ICardData;
}

interface PerformanceCardProps {
  title: string;
  type?: CardType;
  data: ICardData;
  isActive: boolean;
  onChangeActiveCard: () => void;
}

const PerformanceCard: React.FC<PerformanceCardProps> = ({
  title,
  data,
  type,
  isActive,
  onChangeActiveCard,
}: PerformanceCardProps) => {

  const [isIncreasaIndicators, setIsIncreaseIndicators] = useState(false);

  const getPreviousYear = () => {
    return subYears(new Date(), 1).getFullYear();
  };

  const checkIsIncrease = () => {
    Number(data?.average) > Number(data?.lastYear) || 0
      ? setIsIncreaseIndicators(true)
      : setIsIncreaseIndicators(false);
  };

  const countVarianceBetweenIndicators = (
    oldValue: number,
    newValue: number
  ) => {
    if (oldValue === 0) {
      return newValue === 0 ? 0 : 100;
    }
    const percentage = ((newValue - oldValue) / oldValue) * 100;
    return Math.abs(Math.floor(percentage));
  };

  useEffect(() => {
    checkIsIncrease();
  }, [data]);

  return (
    <li
      onClick={() => onChangeActiveCard()}
      className={cn(
        "bg-[#FFF] lg:w-[351px] lg:h-[180px]  shadow-sm relative rounded-[9px] mt-3 cursor-pointer w-full",
        isActive && "bg-[#FF6720] text-[#FFF]"
      )}
    >
      <div className="lg:mt-9 mt-8 mb-6 flex items-start gap-6 ml-6 justify-start flex-wrap">
        <div className="flex flex-col gap-10 text-sm font-[500]">
          <span
            className={cn(
              "text-[#666666] text-[32px] mt-3",
              isActive && "text-[#FFF]"
            )}
          >
            {type === CardType.USER_SEGMENTATION && <span className="text-[20px]/[24px]">Mostly: </span>}
            {data?.average || 0}
            {type === CardType.AVARAGE && "$"}
            {/* {type === CardType.REDIRECTS && "%"} */}
          </span>
        </div>

        {
          type !== CardType.USER_SEGMENTATION && <div className="mr-auto">
          <div className="flex items-center gap-4">
            <span className="font-[500] text-md">
              {countVarianceBetweenIndicators(
                Number(data?.average) || 0,
                Number(data?.lastYear) || 0
              )}{" "}
              %
            </span>

            {isActive ? (
              <Triangle
                width={11}
                height={11}
                fill="white"
                stroke="white"
                className={`${isIncreasaIndicators ? "" : "rotate-180"}`}
              />
            ) : (
              <Triangle
                width={11}
                height={11}
                fill={`${isIncreasaIndicators ? "#FF6720" : "#DD0000"}`}
                stroke={`${isIncreasaIndicators ? "#FF6720" : "#DD0000"}`}
                className={`${isIncreasaIndicators ? "" : "rotate-180"}`}
              />
            )}
          </div>
          <div
            className={cn(
              "text-[#666666] font-[400] text-[12px]",
              isActive && "text-[#FFF]"
            )}
          >
            vs {getPreviousYear()}
          </div>
        </div>
        }

        <div className="flex flex-col gap-2 lg:gap-4 lg:w-full w-auto mr-5 lg:mr-0">
          <span>Last year</span>
          <span className={cn("text-[#666666]", isActive && "text-[#FFF]")}>
            {data?.lastYear || 0}
            {type === CardType.AVARAGE && "$"}
            {/* {type === CardType.REDIRECTS && "%"} */}
          </span>
        </div>
      </div>
      <div
        className={cn(
          "bg-[#FFF] absolute lg:-bottom-[-93%] -bottom-[-88%] lg:py-4 lg:px-6 p-2 rounded-[9px] lg:font-[500] leading-6 font-normal",
          isActive && "lg:w-[351px] w-full bg-[#FF6720] text-[#FFF]"
        )}
      >
        {title}
      </div>
    </li>
  );
};

export default PerformanceCard;
