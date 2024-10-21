'use client';

import { PriceAlertTab } from './PriceAlertsTab';
import { RoutesTab } from './RoutesTab';
import { TabsContent } from '@radix-ui/react-tabs';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import PriceAlerts from '@/components/SolutionFinder';
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
          <TabsList className="grid w-[290px] grid-cols-2 mx-auto mb-[28px]">
            <TabsTrigger
              className={`data-[state="active"]:bg-orangeSecondary border-b-2 data-[state="active"]:border-orangePrimary rounded-none`}
              value="routes"
            >
              Routes
            </TabsTrigger>
            <TabsTrigger
              value="price-alerts"
              className={`data-[state="active"]:bg-orangeSecondary border-b-2 data-[state="active"]:border-orangePrimary rounded-none`}
            >
              Price alert
            </TabsTrigger>
          </TabsList>
          <TabsContent value="routes">
            <RoutesTab />
          </TabsContent>
          <TabsContent value="price-alerts">
            <PriceAlertTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RoutesMain;
