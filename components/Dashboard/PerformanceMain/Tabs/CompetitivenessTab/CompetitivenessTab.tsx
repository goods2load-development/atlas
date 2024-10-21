import PerformanceCards from "../../PerformanceCards";
import { useEffect, useMemo, useState } from "react";
import { ICard, CardType } from "../../PerformanceCard";
import CompetitivenessChart, {
  ICompetitivnessChart,
} from "./CompetitivenessChart";

export interface ICompetitiveness {
  currentYearProfit: ICompetitivnessChart[];
  lastYearProfit: ICompetitivnessChart[];
}

const CompetitivenessTab = ({ data }: { data: any }) => {
  const cardsData = useMemo(() => {
    const currentYearProfit = data?.competitiveness?.currentYear || [];
    const lastYearProfit = data?.competitiveness?.lastYear || [];

    return currentYearProfit.map((current: any) => {
      const last = lastYearProfit?.find(
        (last: any) => last.label === current.label
      );
      return {
        label: current.label,
        type: CardType.COMPETITIVENESS,
        data: {
          average: current.value,
          lastYear: last ? last.value : 0,
        },
      };
    });
  }, [data]);

  const [activeCard, setActiveCard] = useState<ICard>(cardsData[0]);

  const handleActiveCardChange = (activeCard: ICard) => {
    setActiveCard(activeCard);
  };

  return (
    <>
      <PerformanceCards
        data={cardsData}
        activeCard={activeCard}
        onChangeActiveCard={handleActiveCardChange}
      />
      <CompetitivenessChart data={data?.competitiveness?.currentYear || []} />
    </>
  );
};

export default CompetitivenessTab;
