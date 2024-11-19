import { DeliveryBy } from './filterStore';
import { getRequest, postRequest } from './utils';

import { create } from 'zustand';

import { ICardData } from '@/components/Dashboard/PerformanceMain/PerformanceCard';
import { ICompetitiveness } from '@/components/Dashboard/PerformanceMain/Tabs/CompetitivenessTab/CompetitivenessTab';
import { IEvolutionChart } from '@/components/Dashboard/PerformanceMain/Tabs/EvolutionTab/EvolutionChart';
import { IGeolocation } from '@/components/Dashboard/PerformanceMain/Tabs/UserSegmentationaTab/UserSegmentationTab';

export interface IPerformanceData {
  fare: ICardData;
  chartFare: IEvolutionChart[];

  searchers: ICardData;
  chartSearchers: IEvolutionChart[];

  redirects: ICardData;
  chartRedirects: IEvolutionChart[];

  competitiveness: ICompetitiveness;

  geolocation: IGeolocation;
}

export interface IAnalyticsStore {
  deliveryBy: DeliveryBy;
  performanceData: IPerformanceData | undefined;
  performanceDataIsLoading: boolean;
  performanceDataError: string;

  getPerformancedData: (deliveryBy: DeliveryBy) => void;
  onChangeTransportation: (deliveryBy: DeliveryBy) => void;
  getGeolocationInformation: (data: any) => any;
  postGeolocationUser: (data: any) => any;
  postInteractionWithPartner: (partnerId: string) => void;
}

export const useAnalyticsStore = create<IAnalyticsStore>((set) => ({
  deliveryBy: DeliveryBy.plane,
  performanceData: undefined,
  performanceDataIsLoading: false,
  performanceDataError: '',

  getPerformancedData: async (deliveryBy: DeliveryBy) => {
    postRequest({
      url: `analytics?user_id=${localStorage.getItem('id')}`,
      data: { transportation: deliveryBy },
    }).then((data) => {
      set(() => ({
        performanceData: data,
      }));
    });
  },

  onChangeTransportation: (deliveryBy: DeliveryBy) =>
    set(() => ({ deliveryBy })),

  getGeolocationInformation: async () => {
    try {
      const response = await fetch(
        `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.NEXT_PUBLIC_KEY_GET_GEOLOCATION}`,
      );

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      return response.json();
    } catch (error) {
      console.log(error);
    }
  },

  postGeolocationUser: (data: any) => {
    postRequest({
      url: `users/geolocations?country=${data}`,
      data,
    });
  },

  postInteractionWithPartner: (partnerId: string) => {
    postRequest({
      url: `analytics/competitiveness/trigger`,
      data: { partnerId },
    });
  },
}));
