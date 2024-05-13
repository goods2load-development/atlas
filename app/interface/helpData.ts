export enum TabName {
  PLANE = "Plane",
  SHIP = "Ship",
  TRUCK = "Truck",
}

interface Tab {
  question: string;
  description: string | JSX.Element;
}

export type HelpData = Record<TabName, Tab[]>