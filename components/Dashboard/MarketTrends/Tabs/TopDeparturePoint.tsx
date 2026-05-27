import Map from '../../Map/Map';
import { MarketTrendsTab } from '../MarketTrendsTab';
import { getRequest } from '@/lib/utils';

import { useCallback, useEffect, useState } from 'react';

const TopDeparturePoint = ({ data }: { data: any }) => {
  const [preparedData, setPreparedData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setPreparedData([]);
    if (!!data.length) {
      getCoordinatesForCountry(data);
    }
  }, [data]);

  const getCoordinatesForCountry = useCallback(
    async (data: any) => {
      setIsLoading(true);

      const result = await Promise.all(
        data.map(async (item: any) => {
          try {
            // ✅ Call your own route — no CORS, no key exposure
            const response = await fetch(
              `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(item.label)}&format=json&limit=1`,
              { headers: { 'Accept-Language': 'en' } },
            );
            const result = await response.json();

            if (!result?.length) return null;

            return {
              from: {
                name: item.label,
                coordinates: [
                  parseFloat(result[0].lon),
                  parseFloat(result[0].lat),
                ],
              },
              to: null,
            };
          } catch {
            return null;
          }
        }),
      );

      setPreparedData(result);
      setIsLoading(false);
    },
    [data],
  );

  return (
    <MarketTrendsTab title={'Top departure point'} isLoading={isLoading}>
      <Map data={preparedData} />
    </MarketTrendsTab>
  );
};

export default TopDeparturePoint;
