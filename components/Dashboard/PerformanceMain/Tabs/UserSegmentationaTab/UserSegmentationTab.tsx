import { CardType, ICard } from '../../PerformanceCard';
import PerformanceCards from '../../PerformanceCards';
import UserSegmentationChart from './UserSegmentationChart';

import { useMemo, useState } from 'react';

export interface IGeolocation {
  avarage: string;
  lastYear: string;
}

const UserSegmentationTab = ({ data }: { data: any }) => {
  const cardsData = useMemo<ICard[]>(
    () => [
      {
        label: 'Geolocation',
        type: CardType.USER_SEGMENTATION,
        data: data?.geolocation || [],
      },
      {
        label: 'Incoterms',
        type: CardType.USER_SEGMENTATION,
        data: data?.incoterms || [],
      },
    ],
    [data],
  );

  const [activeCard, setActiveCard] = useState<ICard>(cardsData[0]);

  const handleActiveCardChange = (activeCard: ICard) => {
    setActiveCard(activeCard);
  };

  const renderActiveChart = () => {
    switch (activeCard.label) {
      case cardsData[0].label: {
        return data?.chartGeolocation || [];
      }
      case cardsData[1].label: {
        return data?.chartIncoterms || [];
      }
      default:
        return [];
    }
  };

  return (
    <>
      <PerformanceCards
        data={cardsData}
        onChangeActiveCard={handleActiveCardChange}
        activeCard={activeCard}
      />
      <UserSegmentationChart data={renderActiveChart()} />
    </>
  );
};

export default UserSegmentationTab;
