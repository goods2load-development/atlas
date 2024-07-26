import MainMenuCard from "./PerformanceCard";
import { useState } from "react";

export enum CardType {
  AVARAGE = "averge",
  SEARCHERS = "searchers",
  REDIRECTS = "redirects",
}

interface PerformanceCardsProps {
  data: any;
}

const PerformanceCards: React.FC<PerformanceCardsProps> = ({ data }) => {
  const [activeCard, setActiveCard] = useState<CardType>(CardType.AVARAGE);

  return (
    <ul className="flex items-center flex-wrap gap-8 lg:gap-14 xl:gap-0">
      <MainMenuCard
        title="Average fare per transport"
        data={data?.fare}
        type={CardType.AVARAGE}
        isActive={CardType.AVARAGE === activeCard}
        onSetActive={() => setActiveCard(CardType.AVARAGE)}
      />
      <MainMenuCard
        title="Searchers"
        data={data?.searchers}
        type={CardType.SEARCHERS}
        isActive={CardType.SEARCHERS === activeCard}
        onSetActive={() => setActiveCard(CardType.SEARCHERS)}
      />
      <MainMenuCard
        title="Redirects"
        data={data?.redirects}
        type={CardType.REDIRECTS}
        isActive={CardType.REDIRECTS === activeCard}
        onSetActive={() => setActiveCard(CardType.REDIRECTS)}
      />
    </ul>
  );
};

export default PerformanceCards;
