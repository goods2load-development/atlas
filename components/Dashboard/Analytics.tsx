'use client';

import { useAnalyticsStore } from '@/lib/analyticsStore';

import { useEffect } from 'react';

import Cookies from 'js-cookie';

const Analytics = () => {
  const { getGeolocationInformation, postGeolocationUser } =
    useAnalyticsStore();

  useEffect(() => {
    let isVisitedBefore = Cookies.get('isVisitedBefore');

    if (!isVisitedBefore) {
      Cookies.set('isVisitedBefore', 'true', { expires: 30 });

      getGeolocationInformation({}).then(({ country_name }: any) => {
        postGeolocationUser(country_name);
      });
    }
  }, []);

  return null;
};

export default Analytics;
