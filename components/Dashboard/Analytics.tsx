"use client"

import { useEffect } from 'react';
import { usePerformanceStore } from '@/lib/analyticsStore';
import Cookies from 'js-cookie';

const Analytics = () => {
  const { getGeolocationInformation, postGeolocationUser } = usePerformanceStore();

  useEffect(() => {
    let isVisitedBefore = Cookies.get('isVisitedBefore');

    if (!isVisitedBefore) {
      Cookies.set('isVisitedBefore', "true", { expires: 30 });
      
      getGeolocationInformation({}).then(({country_name}: any) => {
        postGeolocationUser(country_name);
      });
    }

  }, []);

  return null;
};

export default Analytics;
