export enum TabName {
  PLANE = "plane",
  SHIP = "ship",
  TRUCK = "truck",
}

interface Tab {
  question: string;
  description: string | JSX.Element;
}

export type HelpData = Record<TabName, Tab[]>;
