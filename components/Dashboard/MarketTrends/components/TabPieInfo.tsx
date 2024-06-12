import PieChart, { PieData } from "../../Charts/PieChart";

const TabPieInfo = ({ data }: { data: PieData[] }) => {
  return (
    <div className="flex justify-between gap-10 items-stretch min-h-[400px]">
      <div className="w-full">
        <PieChart data={data} />
      </div>
      <ul className="flex flex-col justify-center gap-4 min-w-[100px]">
        {data.map(({ name, value, color }: any) => {
          return (
            <li key={name}>
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-[8px] h-[8px] rounded-full pl-1"
                  style={{ backgroundColor: color }}
                ></div>
                <span className="text-extraHalfBlack text-xs">{name}</span>
              </div>
              <div>{value}%</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TabPieInfo;
