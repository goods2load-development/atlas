import Map from '../../Map/Map';
import { MarketTrendsTab } from '../MarketTrendsTab';
import { getRequest } from '@/lib/utils';

import { useCallback, useEffect, useState } from 'react';

import { url } from 'inspector';
import { headers } from 'next/headers';

const TopDeparturePoint = ({ data }: { data: any }) => {
  const [preparedData, setPreparedData] = useState<any>([]);

  useEffect(() => {
    setPreparedData([]);
    if (!!data.length) {
      getCoordinatesForCountry(data);
    }
  }, [data]);

  const getCoordinatesForCountry = useCallback(
    async (data: any) => {
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
    },
    [data],
  );

  useEffect(() => {
    console.log(preparedData, 'prepared data');
  }, [preparedData]);

  return (
    <MarketTrendsTab title={'Top departure point'}>
      <Map data={preparedData} />
    </MarketTrendsTab>
  );
};

export default TopDeparturePoint;
