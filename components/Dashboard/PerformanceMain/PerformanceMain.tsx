"use client";

import { useState } from "react";
import MainMenuTabs from "./MainMenuTabs";
import { IMainMenuCard, IMainMenuItemTab } from "@/app/interface/dashboard";
import MainMenuCardsList from "./MainMenuCardsList";
import EvolutionTab from "./Tabs/EvolutionTab";
import CompetitivenessTab from "./Tabs/CompetitivenessTab";

export interface PerformanceMainProps {
  cardsData: IMainMenuCard[];
  tabsData: any;
}

const PerformanceMain = ({ cardsData, tabsData }: PerformanceMainProps) => {
  const [tabs, setTabs] = useState<IMainMenuItemTab[]>([
    {
      label: "Evolution",
      active: true,
      element: <EvolutionTab data={tabsData.evolution} />,
    },
    {
      label: "Competitiveness",
      active: false,
      element: <CompetitivenessTab data={tabsData.competitiveness} />,
    },
    {
      label: "Competitive pressure",
      active: false,
      element: <CompetitivenessTab data={tabsData.competitivePressure} />,
    },
  ]);

  const [cards, setCards] = useState<IMainMenuCard[]>(cardsData);

  const handleTabClick = (name: string) => {
    setTabs(
      tabs.map((tab) => {
        if (name === tab.label) {
          return { ...tab, active: true };
        }
        return { ...tab, active: false };
      })
    );
  };

  const handleSelectCard = (name: string) => {
    setCards(
      cards.map((card) => {
        if (card.title === name) {
          return { ...card, active: true };
        }
        return { ...card, active: false };
      })
    );
  };

  return (
    <div className="flex flex-col justify-center mt-4">
      <MainMenuTabs handleTabClick={handleTabClick} tabs={tabs} />
      <MainMenuCardsList handleSelectCard={handleSelectCard} cards={cards} />
      {tabs.filter((elem) => elem.active)[0].element}
    </div>
  );
};

export default PerformanceMain;
