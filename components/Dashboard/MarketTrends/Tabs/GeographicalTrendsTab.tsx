import Map from '../../Map/Map';
import { MarketTrendsTab } from '../MarketTrendsTab';

const GeographicalTrendsTab = ({ data }: { data: any }) => {
  return (
    <MarketTrendsTab title={data.title}>
      <Map data={data.markers} />
    </MarketTrendsTab>
  );
};

export default GeographicalTrendsTab;
