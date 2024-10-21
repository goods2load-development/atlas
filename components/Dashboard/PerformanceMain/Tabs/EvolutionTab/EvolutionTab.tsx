"use client";

import { useState, useMemo, useEffect } from "react";
import { ICard, CardType } from "../../PerformanceCard";

import PerformanceCardsList from "../../PerformanceCards";
import EvolutionChart from "./EvolutionChart";
import IndustryChart from "./IndustryChart";

const PerformanceEvolutionTab = ({ data }: { data: any }) => {
  const cardsData = useMemo<ICard[]>(
    () => [
      {
        label: "Industry solutions",
        type: CardType.INDUSTRY_SOLUTION,
        data: data?.industrySolutions || [],
      },
      { label: "Searchers", data: data?.searchers || [] },
      { label: "Redirects", data: data?.redirects || [] },
    ],
    [data]
  );

  const [activeCard, setActiveCard] = useState<ICard>(cardsData[0]);

  const handleActiveCardChange = (activeCard: ICard) => {
    setActiveCard(activeCard);
  };

  const renderActiveChart = () => {
    switch (activeCard.label) {
      case cardsData[0].label:
        return <IndustryChart data={data?.industrySolutions || []} />;
      case cardsData[1].label:
        return <EvolutionChart data={data?.chartSearchers || []} />;
      case cardsData[2].label:
        return <EvolutionChart data={data?.chartRedirects || []} />;
      default:
        return null;
    }
  };

  return (
    <>
      <PerformanceCardsList
        activeCard={activeCard}
        onChangeActiveCard={handleActiveCardChange}
        data={cardsData}
      />
      {renderActiveChart()}
    </>
  );
};

export default PerformanceEvolutionTab;
