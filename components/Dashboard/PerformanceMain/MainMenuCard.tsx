import { IMainMenuCard } from "@/app/interface/dashboard";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface MainMenuCardProps {
  card: IMainMenuCard;
  handleSelectCard: (name: string) => void;
}

const MainMenuCard: React.FC<MainMenuCardProps> = ({
  card,
  handleSelectCard,
}) => {
  return (
    <li
      onClick={() => handleSelectCard(card.title)}
      className={cn(
        "bg-[#FFF] lg:w-[351px] lg:h-[180px]  shadow-sm relative rounded-[9px] mt-3 cursor-pointer w-full",
        card.active && "bg-[#FF6720] text-[#FFF]"
      )}
    >
      <div className="lg:mt-9 mt-8 mb-6 flex items-start gap-6 ml-6 justify-start flex-wrap">
        <div className="flex flex-col gap-10 text-sm font-[500]">
          <span
            className={cn(
              "text-[#666666] text-[32px] mt-3",
              card.active && "text-[#FFF]"
            )}
          >
            {card.price}
          </span>
        </div>

        <div className="mr-auto">
          <div className="flex items-center gap-4">
            <span className="font-[500] text-md">{card.percentage} %</span>
            <Image
              src={`/arrow-${card.active ? "up" : "down"}.png`}
              alt="arrow-down"
              width={11}
              height={11}
            />
          </div>
          <div
            className={cn(
              "text-[#666666] font-[400] text-[12px]",
              card.active && "text-[#FFF]"
            )}
          >
            vs {card.vs}
          </div>
        </div>

        <div className="flex flex-col gap-2 lg:gap-4 lg:w-full w-auto mr-5 lg:mr-0">
          <span>Last year</span>
          <span className={cn("text-[#666666]", card.active && "text-[#FFF]")}>
            {card.lastPrice}
          </span>
        </div>
      </div>
      <div
        className={cn(
          "bg-[#FFF] absolute lg:-bottom-[-93%] -bottom-[-88%] lg:py-4 lg:px-6 p-2 rounded-[9px] lg:font-[500] leading-6 font-normal",
          card.active && "lg:w-[351px] w-full bg-[#FF6720] text-[#FFF]"
        )}
      >
        {card.title}
      </div>
    </li>
  );
};

export default MainMenuCard;
