import { ICard } from './PerformanceCard';
import PerformanceCard from './PerformanceCard';

import { useEffect } from 'react';

interface PerformanceCardsProps {
  data: any;
  activeCard: ICard;
  onChangeActiveCard: (activeCard: ICard) => void;
}

const PerformanceCards: React.FC<PerformanceCardsProps> = ({
  data,
  activeCard,
  onChangeActiveCard,
}) => {
  return (
    <ul className="flex items-center flex-wrap gap-8 lg:gap-14 xl:gap-0">
      {data.map((elem: ICard) => {
        return (
          <PerformanceCard
            key={elem.label}
            title={elem.label}
            data={elem.data}
            type={elem.type}
            isActive={activeCard.label === elem.label}
            onChangeActiveCard={() => onChangeActiveCard(elem)}
          />
        );
      })}
    </ul>
  );
};

export default PerformanceCards;
