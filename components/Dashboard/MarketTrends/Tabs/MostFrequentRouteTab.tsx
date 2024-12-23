import Map from '../../Map/Map';
import { tab1Data } from '../mocks/tabs';
import TabMapDetails from './TabMapDetails';

import { MarketTrendsTab } from '@/components/Dashboard/MarketTrends/MarketTrendsTab';

const MostFrequentRouteTab = (data: any) => {
  return (
    <>
      <MarketTrendsTab title="Most frequent route">
        <Map data={tab1Data.markers} />
      </MarketTrendsTab>
      <MarketTrendsTab>
        <TabMapDetails data={tab1Data.data} />
      </MarketTrendsTab>
    </>
  );
};

export default MostFrequentRouteTab;
