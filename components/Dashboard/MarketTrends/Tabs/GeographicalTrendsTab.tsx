import Map from '../../Map/Map';
import { MarketTrendsTab } from '../MarketTrendsTab';
import { tab1Data } from '../mocks/tabs';
import { getRequest } from '@/lib/utils';

import { useCallback, useEffect, useState } from 'react';

const GeographicalTrendsTab = ({ data }: { data: any }) => {
  // const [preparedData, setPreparedData] = useState<any>([]);
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  // useEffect(() => {
  //   setPreparedData([]);
  //   if (!!data.length) {
  //     getCoordinatesForCountry(data);
  //   }
  // }, [data]);

  // const getCoordinatesForCountry = useCallback(
  //   async (data: any) => {
  //     setIsLoading(true);
  //     const result = await Promise.all(
  //       data.map(async (item: any) => {
  //         const splitData = item.label.split(' - ');

  //         const fromResult = await getRequest({
  //           url: `https://maps.googleapis.com/maps/api/geocode/json?address=${splitData[0].replace(/,\s+/g, ', ')}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`,
  //           withCredentials: false,
  //         });

  //         const toResult = await getRequest({
  //           url: `https://maps.googleapis.com/maps/api/geocode/json?address=${splitData[1].replace(/,\s+/g, ', ')}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`,
  //           withCredentials: false,
  //         });

  //         if (fromResult?.status !== 'OK' || toResult.status !== 'OK') {
  //           return null;
  //         }

  //         return {
  //           from: {
  //             name: splitData[0],
  //             coordinates: [
  //               fromResult?.results[0]?.geometry?.location?.lng,
  //               fromResult?.results[0]?.geometry?.location?.lat,
  //             ],
  //           },
  //           to: {
  //             name: splitData[1],
  //             coordinates: [
  //               toResult?.results[0]?.geometry?.location?.lng,
  //               toResult?.results[0]?.geometry?.location?.lat,
  //             ],
  //           },
  //         };
  //       }),
  //     );

  //     console.log(result, 'RESULT');
  //     setPreparedData(result);
  //     setIsLoading(false);
  //   },
  //   [data],
  // );

  return (
    <MarketTrendsTab title={'Most frequent route'}>
      <Map data={tab1Data.markers} />
    </MarketTrendsTab>
  );
};

export default GeographicalTrendsTab;
