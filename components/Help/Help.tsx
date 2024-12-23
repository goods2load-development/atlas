'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import HelpContainer from '@/app/_components/Help/HelpContainer/HelpContainer';
import { tabs } from '@/app/_components/Help/helpData';

import { useState } from 'react';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Help() {
  const router = useRouter();
  const tabParam = useSearchParams().toString().split('=')[0];
  const tabFromDataByParam = tabs.find(({ name }) => name === tabParam);
  const initTab = tabFromDataByParam || tabs[0];
  const [currentTab, setCurrentTab] = useState(initTab);

  return (
    <>
      <Tabs
        value={currentTab.name}
        className="mt-[-130px] sm:mt-[-200px] w-full"
        onValueChange={(e) => {
          const newTab = tabs.find(({ name }) => name === e);
          newTab && setCurrentTab(newTab);
          router.push(`/help?${e.toLowerCase()}`);
        }}
      >
        <TabsList className="flex justify-center mt-54 max-w-[280px] mx-auto sm:max-w-full">
          {tabs.map(({ name, icon }) => (
            <TabsTrigger
              key={name}
              value={name}
              style={{ backgroundColor: 'transparent', color: 'white' }}
              className={`flex items-center w-[260px] text-center italic capitalize text-[18px]/[22px] sm:text-[24px]/[31px] font-light h-[57px] hover:cursor-pointer ${currentTab.name === name ? 'decorative-link text-white-500 hover:text-white-700' : 'font-normal'}`}
            >
              <Image
                src={icon}
                width={28}
                height={28}
                className="w-[28px] min-w-[28px] h-[28px] min-h-[28px] sm:w-[40px] sm:min-w-[40px] sm:h-[40px] sm:min-h-[40px] mr-[8px] sm:mr-[16px]"
                alt={'icon'}
              />
              {name}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map(({ name }) => (
          <TabsContent key={name} value={name}>
            <HelpContainer answearCondition={currentTab.name} />
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
}
