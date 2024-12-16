import PieChart, { PieData } from '../../Charts/PieChart';

import clsx from 'clsx';

const TabPieInfo = ({
  data,
  upperCase = false,
}: {
  data: PieData[];
  upperCase?: boolean;
}) => {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-10 lg:items-stretch">
      <div className="w-full h-[300px] lg:h-[400px]">
        <PieChart data={data} />
      </div>
      <ul className="flex lg:flex-col gap-2 justify-center lg:gap-4 min-w-[100px] flex-wrap">
        {data?.map(({ name, value, color }: any) => {
          return (
            <li key={name}>
              <div className="flex items-center gap-2 mb-2 w-20 lg:w-auto">
                <div
                  className="min-w-[8px] min-h-[8px] rounded-full pl-1"
                  style={{ backgroundColor: color }}
                ></div>
                <span
                  className={clsx(
                    'text-extraHalfBlack text-xs lg:text-sm first-letter:capitalize',
                    upperCase ? 'uppercase' : 'lowercase',
                  )}
                >
                  {name}
                </span>
              </div>
              <div className="text-xs text lg:text-left lg:pl-4 lg:text-sm pl-4">
                {value}%
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TabPieInfo;
