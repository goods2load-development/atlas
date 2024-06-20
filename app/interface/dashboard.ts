import { PerformanceTabName, TabName } from "./helpData";

export interface IMainMenuItemTab {
  label: string;
  active: boolean;
}

export interface IMainMenuCard {
  title: string;
  category: TabName;
  price: string;
  type: PerformanceTabName;
  active: boolean;
  vs: number;
  percentage: number;
  isIncreasePercentage: boolean;
  lastPrice: string;
}
