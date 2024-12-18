import { MarketTrendsTab } from '../MarketTrendsTab';
import TabPieInfo from './TabPieInfo';

const ServiceSatisfactionTab = ({ data }: { data: any }) => {
  return (
    <MarketTrendsTab
      title={'Service satisfaction rate from 1 to 10'}
      description={'where 10 - excellent and 0 - unsatisfactory'}
    >
      <TabPieInfo data={data.data} />
    </MarketTrendsTab>
  );
};

export default ServiceSatisfactionTab;
