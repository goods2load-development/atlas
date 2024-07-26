import { create } from "zustand";
import { postRequest } from "./utils";
import { IAnalyticsStore, Transportation } from "@/app/interface/dashboard";

export const usePerformanceStore = create<IAnalyticsStore>((set) => ({
  transportation: Transportation.PLANE,
  performanceData: undefined,
  performanceDataIsLoading: false,
  performanceDataError: "",

  getPerformancedData: async (transportation: string) => {
    postRequest({
      url: "analytics",
      data: { transportation },
    }).then((data) => {
      set(() => ({
        performanceData: data,
      }));
    });
  },

  onChangeTransportation: (transportation: Transportation) =>
    set(() => ({ transportation })),
}));
