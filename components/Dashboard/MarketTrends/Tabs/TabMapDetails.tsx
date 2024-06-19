import PieChartCustom from "../../Charts/PieChartCustom";

export interface MapDetails {
  name: string;
  value: number;
  color: string;
}

const TabMapDetails = ({ data }: { data: MapDetails[] }) => {
  return (
    <div className="h-full flex flex-wrap justify-center items-center lg:px-20 overflow-hidden px-2">
      <div className="h-[250px] lg:w-[300px] w-[200px]">
        <PieChartCustom data={data} />
      </div>
      <div className="flex flex-col gap-2">
        {data.map((elem, idx) => {
          return (
            <div
              key={idx}
              className="flex items-center gap-2 px-2 py-1 bg-gray-50 rounded-lg lg:w-[285px] w-full text-xs lg:text:sm"
            >
              <div
                className="w-[8px] h-[8px] rounded-full lg:mr-2"
                style={{ backgroundColor: elem.color }}
              ></div>
              <span className="text-blackSecondary whitespace-nowrap overflow-hidden">
                {elem.name}
              </span>
              <div className="ml-auto border-[1px] border-primaryOrange text-primaryOrange rounded-3xl px-1 sm:px-4 py-1">
                {elem.value}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TabMapDetails;
