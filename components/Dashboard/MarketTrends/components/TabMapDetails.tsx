import PieChartCustom from "../../Charts/PieChartCustom";

export interface MapDetails {
  name: string;
  value: number;
  color: string;
}

const TabMapDetails = ({ data }: { data: MapDetails[] }) => {
  return (
    <div className="h-full flex justify-between items-center px-20">
      <div className="h-[250px] w-[300px]">
        <PieChartCustom data={data} />
      </div>
      <div className="flex flex-col gap-2">
        {data.map((elem, idx) => {
          return (
            <div
              key={idx}
              className="flex items-center px-2 py-1 bg-gray-50 rounded-lg w-[285px]"
            >
              <div
                className="w-[8px] h-[8px] rounded-full mr-2"
                style={{ backgroundColor: elem.color }}
              ></div>
              <span className="text-blackSecondary whitespace-nowrap overflow-hidden">
                {elem.name}
              </span>
              <div className="ml-auto border-[1px] border-primaryOrange text-primaryOrange rounded-3xl px-4 py-1">
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
