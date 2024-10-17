'use client';

import { type Tab } from './MarketTrendsMain';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import Image from 'next/image';

interface MarketTrendsTabs {
  tabs: Tab[];
  activeTab: Tab;
  onChangeTab: (id: number) => void;
}

const MarketTrendsTabs = ({
  tabs,
  activeTab,
  onChangeTab,
}: MarketTrendsTabs) => {
  return (
    <>
      <div className="py-8 px-6 rounded-md bg-white md:block hidden">
        {
          <ol className="flex flex-col gap-4 w-[310px]">
            {tabs.map(({ id, text }, idx) => {
              return (
                <li
                  className={`p-2 whitespace-nowrap rounded-md flex gap-2 hover:bg-primaryOrange hover:opacity-80 cursor-pointer hover:text-white transition-all uppercase ${activeTab.id === id ? 'font-semibold' : ''}`}
                  key={id}
                  style={{
                    backgroundColor: activeTab.id === id ? '#FF6720' : '',
                    color: activeTab.id === id ? 'white' : '',
                    pointerEvents: activeTab.id === id ? 'none' : 'all',
                  }}
                  onClick={() => onChangeTab(id)}
                >
                  <span>{idx + 1}</span>
                  <span className="overflow-hidden">{text}</span>
                </li>
              );
            })}
          </ol>
        }
      </div>

      <div className="py-2 px-1 rounded-md bg-white mx-auto mb-6 md:hidden overflow-scroll w-full">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger className="p-1 text-white rounded-md flex items-center gap-3 outline-none w-full">
            <div className="flex gap-1 bg-primaryOrange p-1 w-full rounded-md sm:p-2 sm:gap-2">
              <div className="font-semibold">{activeTab.id}</div>
              <div className="whitespace-nowrap uppercase font-semibold">
                {activeTab.text}
              </div>
            </div>
            <div className="flex items-center justify-center rounded-md w-[30px] h-[30px] sm:w-[38px] sm:h-[38px] bg-primaryOrange">
              <Image
                src="/arrow-down.svg"
                width={14}
                height={7}
                alt="arrow-down"
                className="min-w-[14px]"
              />
            </div>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content className="py-4 bg-white rounded shadow-lg relative z-50 max-h-[300px] overflow-y-auto">
            <ol className="flex flex-col gap-4 px-4">
              {tabs.map(({ id, text }, idx) => (
                <DropdownMenu.Item
                  className={`outline-none p-2 whitespace-nowrap rounded-md flex gap-2 hover:bg-primaryOrange hover:opacity-80 cursor-pointer hover:text-white transition-all font ${activeTab.id === id ? 'font-semibold' : ''} ${
                    activeTab.id === id ? 'bg-primaryOrange text-white' : ''
                  } ${activeTab.id === id ? 'pointer-events-none' : ''}`}
                  key={id}
                  onSelect={() => onChangeTab(id)}
                  disabled={activeTab.id === id}
                >
                  <span>{idx + 1}</span>
                  <span className="uppercase">{text}</span>
                </DropdownMenu.Item>
              ))}
            </ol>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </>
  );
};

export default MarketTrendsTabs;
