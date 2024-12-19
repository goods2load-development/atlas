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
          const result = await getRequest({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${item.label.replace(/,\s+/g, ', ')}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`,
            withCredentials: false,
          });

          if (result?.status !== 'OK') {
            return null;
          }

          return {
            from: {
              name: item.label,
              coordinates: [
                result?.results[0]?.geometry?.location?.lng,
                result?.results[0]?.geometry?.location?.lat,
              ],
            },
            to: null,
          };
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
