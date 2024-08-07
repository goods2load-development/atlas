"use client"

import { useState, useMemo } from "react";
import { ICard, CardType } from "../../PerformanceCard";


import PerformanceCardsList from "../../PerformanceCards";
import EvolutionChart from "./EvolutionChart";


const PerformanceEvolutionTab = ({ data }: { data: any }) => {
  const cardsData = useMemo<ICard[]>(() => [
    { label: "Average fare per transport", type: CardType.AVARAGE, data: data?.fare || []},
    { label: "Searchers", data: data?.searchers || []},
    { label: "Redirects", data: data?.redirects || []}
  ], [data]);

  const [activeCard, setActiveCard] = useState<ICard>(cardsData[0]);

  const handleActiveCardChange = (activeCard: ICard) => {
    setActiveCard(activeCard);
  }

  const renderActiveChart = () => {
  switch (activeCard.label) {
    case cardsData[0].label:
      return data?.chartFare || [];
    case cardsData[1].label:
      return data?.chartSearchers || [];
    case cardsData[2].label:
      return data?.chartRedirects || [];
    default: return []
  }
}

  return (
    <>
      <PerformanceCardsList 
        activeCard={activeCard} 
        onChangeActiveCard={handleActiveCardChange} 
        data={cardsData}
      />
      <EvolutionChart data={renderActiveChart()} />
    </>
  );
};

export default PerformanceEvolutionTab;
