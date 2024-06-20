"use client";
import { useState } from "react";
import MainMenuTabs from "./MainMenuTabs";
import { IMainMenuCard, IMainMenuItemTab } from "@/app/interface/dashboard";
import MainMenuCardsList from "./MainMenuCardsList";
import { PerformanceTabName, TabName } from "@/app/interface/helpData";
import PerformanceChart from "../Charts/PerformanceChart";

const PerformanceMain = () => {
  const [tabs, setTabs] = useState<IMainMenuItemTab[]>([
    {
      label: "Evolution",
      active: true,
    },
    {
      label: "Competitiveness",
      active: false,
    },
    {
      label: "Competitive pressure",
      active: false,
    },
  ]);

  const [cards, setCards] = useState<IMainMenuCard[]>([
    {
      title: "Average fare per transport",
      category: TabName.PLANE,
      price: "72$",
      type: PerformanceTabName.EVOLUTION,
      active: false,
      vs: 2019,
      percentage: 25.2,
      isIncreasePercentage: false,
      lastPrice: "155$",
    },
    {
      title: "Searchers",
      category: TabName.SHIP,
      price: "105M",
      type: PerformanceTabName.COMPETITIVENESS,
      active: true,
      vs: 2019,
      isIncreasePercentage: true,
      percentage: 11.2,
      lastPrice: "98M",
    },
    {
      title: "Redirects",
      category: TabName.TRUCK,
      price: "3.0%",
      type: PerformanceTabName.COMPETITIVE_PRESSURE,
      active: false,
      vs: 2019,
      percentage: 9.3,
      isIncreasePercentage: false,
      lastPrice: "2%",
    },
  ]);

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
      <PerformanceChart />
    </div>
  );
};

export default PerformanceMain;
