'use client';

import { FreeQuotationsTab } from './FreeQuotationsTab';
import { RoutesTab } from './RoutesTab';
import { SolutionFinderTab } from './SolutionFinderTab';
import { TabsContent } from '@radix-ui/react-tabs';

import clsx from 'clsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const RoutesMain = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const tab = searchParams.get('tab') || 'routes';

  const handleSetTab = (tab: string) => {
    const params = new URLSearchParams(searchParams);
    if (tab) {
      params.set('tab', tab);
    } else {
      params.delete('tab');
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="min-h-screen">
      <div className="flex justify-center items-center mb-8 w-full">
        <Tabs
          onValueChange={handleSetTab}
          value={tab}
          className="w-full mx-auto"
        >
          <TabsList className="flex gap-4 mx-auto mb-[28px]">
            <TabsTrigger className={`[all:unset]`} value="routes">
              <Button
                className={clsx('w-full cursor-pointer min-w-[150px]', {
                  'pointer-events-none opacity-50': tab === 'routes',
                })}
                tagName="span"
              >
                Routes
              </Button>
            </TabsTrigger>
            <TabsTrigger value="price-alerts" className={`[all:unset]`}>
              <Button
                tagName="span"
                className={clsx('cursor-pointer min-w-[150px]', {
                  'pointer-events-none opacity-50': tab === 'price-alerts',
                })}
              >
                Solution Finder
              </Button>
            </TabsTrigger>
            <TabsTrigger value="free-quotations" className={`[all:unset]`}>
              <Button
                tagName="span"
                className={clsx('cursor-pointer min-w-[150px]', {
                  'pointer-events-none opacity-50': tab === 'free-quotations',
                })}
              >
                Free quotations
              </Button>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="routes">
            <RoutesTab />
          </TabsContent>
          <TabsContent value="price-alerts">
            <SolutionFinderTab />
          </TabsContent>
          <TabsContent value="free-quotations">
            <FreeQuotationsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RoutesMain;
