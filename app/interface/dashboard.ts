import { ReactNode } from "react";

export enum Transportation {
  PLANE = "plane",
  FERRY = "ferry",
  TRUCK = "truck",
}

export enum PerformaceTab {
  EVOLUTION = "Evolution",
  COMPETITIVENESS = "Competitiveness",
  COMPETITIVE_PRESSURE = "Competitive pressure",
}

export interface IPerformanceTab {
  label: PerformaceTab;
  element: ReactNode;
}

export interface IEvolutionChart {
  name: string;
  y1: number;
  y2: number;
  amt: number;
}

export interface ICompetitivenessiteItem {
  name: string;
  value: number;
}

export interface IPerformanceCardData {
  average: string;
  lastYear: string | null;
}

export interface IPerformanceData {
  fare: IPerformanceCardData;
  searchers: IPerformanceCardData;
  redirects: IPerformanceCardData;
  evolution: IEvolutionChart[];
  competitiveness: ICompetitivenessiteItem[];
  competitivePressure: ICompetitivenessiteItem[];
}

export interface IAnalyticsStore {
  transportation: Transportation;
  performanceData: IPerformanceData | undefined;
  performanceDataIsLoading: boolean;
  performanceDataError: string;

  getPerformancedData: (transportation: Transportation) => void;
  onChangeTransportation: (transportation: Transportation) => void;
}
