import { MarketTrendsTab } from '../MarketTrendsTab';
import TabPieInfo from './TabPieInfo';

const BookingBihaviorTab = ({ data }: { data: any }) => {
  return (
    <MarketTrendsTab
      title={'Booking behavior'}
      description={
        'Understanding booking behavior is crucial for optimizing logistics efficiency and meeting customer demands effectively.'
      }
    >
      <TabPieInfo data={data.data} />
    </MarketTrendsTab>
  );
};

export default BookingBihaviorTab;
