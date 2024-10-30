import { getRequest } from './utils';

import { create } from 'zustand';

export const usPartnerStore = create((set) => ({
  partnerData: null,
  partnerDataIsLoading: false,
  partnerDataError: '',

  getPartnerData: async (id: string) => {
    getRequest({
      url: `partners/${id}}`,
    }).then((data) => {
      set(() => ({
        partnerData: data,
      }));
    });
  },
}));
