import BarChartGraph from '../../Charts/BarChart';
import { MarketTrendsTab } from '../MarketTrendsTab';

const JourneyDurationTab = ({ data }: { data: any }) => {
  return (
    <MarketTrendsTab title={data.title} description={data.description}>
      <div>
        <div className="w-full lg:h-[500px] h-[300px]">
          <BarChartGraph data={data.data} />
        </div>
        <div className="flex flex-col xl:flex-row flex-wrap items-center gap-5 justify-between mt-10">
          {data.countries.map((elem: any, idx: number) => {
            return (
              <div
                key={idx}
                className="flex gap-2 items-center px-2 py-1 bg-gray-50 rounded-lg xl:w-[40%] w-full"
              >
                <div
                  className="w-[8px] h-[8px] rounded-full mr-2"
                  style={{ backgroundColor: elem.color }}
                ></div>
                <span className="text-blackSecondary whitespace-nowrap text-xs md:text-sm">
                  {data.country} -{' '}
                </span>
                <span className="text-blackSecondary  whitespace-nowrap text-xs md:text-sm">
                  {elem.country}
                </span>
                <div className="ml-auto border-[1px] border-primaryOrange text-primaryOrange rounded-3xl px-1 sm:px-4 py-1 whitespace-nowrap text-xs md:text-sm">
                  {elem.days} days
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </MarketTrendsTab>
  );
};

export default JourneyDurationTab;
