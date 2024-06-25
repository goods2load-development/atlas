export enum TabName {
  PLANE = "plane",
  SHIP = "ship",
  TRUCK = "truck",
}

export enum PerformanceTabName {
  EVOLUTION = "Evolution",
  COMPETITIVENESS = "Competitiveness",
  COMPETITIVE_PRESSURE = "Competitive pressure",
}

interface Tab {
  question: string;
  description: string | JSX.Element;
}

export type HelpData = Record<TabName, Tab[]>;
