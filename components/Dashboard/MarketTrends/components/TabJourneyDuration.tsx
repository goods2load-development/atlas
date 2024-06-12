import { BarChartData } from "../../Charts/BarChart";
import TabBarChart from "./TabBarChart";

interface JourneyDurationCountriesData {
  country: string;
  days: number;
  color: string;
}

export interface JourneyDurationData {
  country: string;
  countries: JourneyDurationCountriesData[];
}

interface JourneyDurationProps {
  data: BarChartData[];
  country: string;
  countries: JourneyDurationCountriesData[];
}

const TabJourneyDuration = ({
  data,
  country,
  countries,
}: JourneyDurationProps) => {
  return (
    <div>
      <TabBarChart data={data} />
      <div className="flex flex-wrap items-center gap-5 justify-between mt-10">
        {countries.map((elem, idx) => {
          return (
            <div
              key={idx}
              className="flex items-center px-2 py-1 bg-gray-50 rounded-lg w-[40%]"
            >
              <div
                className="w-[8px] h-[8px] rounded-full mr-2"
                style={{ backgroundColor: elem.color }}
              ></div>
              <span className="text-blackSecondary">{country} - </span>
              <span className="text-blackSecondary">{elem.country}</span>
              <div className="ml-auto border-[1px] border-primaryOrange text-primaryOrange rounded-3xl px-4 py-1">
                {elem.days} days
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TabJourneyDuration;
