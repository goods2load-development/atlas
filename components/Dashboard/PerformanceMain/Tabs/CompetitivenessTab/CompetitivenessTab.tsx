import { CardType, ICard } from '../../PerformanceCard';
import PerformanceCards from '../../PerformanceCards';
import CompetitivenessChart, {
  ICompetitivnessChart,
} from './CompetitivenessChart';

import { useMemo, useState } from 'react';

export interface ICompetitiveness {
  currentYearProfit: ICompetitivnessChart[];
  lastYearProfit: ICompetitivnessChart[];
}

const CompetitivenessTab = ({ data }: { data: any }) => {
  const cardsData = useMemo(() => {
    const currentYearProfit = data?.competitiveness?.currentYearProfit || [];
    const lastYearProfit = data?.competitiveness?.lastYearProfit || [];

    return currentYearProfit.map((current: any) => {
      const last = lastYearProfit?.find(
        (last: any) => last.label === current.label,
      );
      return {
        label: current.label,
        type: CardType.AVARAGE,
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
      <CompetitivenessChart
        data={data?.competitiveness?.currentYearProfit || []}
      />
    </>
  );
};

export default CompetitivenessTab;
