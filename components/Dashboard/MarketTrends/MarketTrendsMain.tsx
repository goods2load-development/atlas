import { type ReactNode, useState } from "react";
import MarketTrendsTabs from "./MarketTrendsTabs";
import { tabsMocks } from "./mocks/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export interface Tab {
  id: number;
  text: string;
  element: ReactNode;
}

const MarketTrendsMain = () => {
  const [activeTab, setActiveTab] = useState<Tab>(tabsMocks[0]);
  const [tabs, setTabs] = useState<Tab[]>(tabsMocks);

  const onChangeTab = (id: number) => {
    const tab = tabs.find((elem: Tab) => elem.id === id);

    if (tab) {
      setActiveTab(tab);
    }
  };

  function CustomRadioGroupItem({ value, imageNumber }: any) {
    return (
      <>
        <RadioGroupItem value={value} id={value} className="hidden" />
        <Label htmlFor={value}>
          <Image
            src={`/filtericon${imageNumber}.png`}
            alt="plane"
            width={58}
            height={58}
            className={"cursor-pointer text-black"}
          />
        </Label>
      </>
    );
  }

  return (
    <>
      <form className="mt-6 mb-8">
        <div className="flex items-center gap-3 test-radio">
          <RadioGroup
            defaultValue={"plane"}
            className={`flex custom-radio catalogue`}
          >
            <CustomRadioGroupItem value="plane" imageNumber={1} />
            <CustomRadioGroupItem value="ship" imageNumber={2} />
            <CustomRadioGroupItem value="truck" imageNumber={3} />
          </RadioGroup>
        </div>
      </form>
      <div className="flex gap-5">
        <MarketTrendsTabs
          tabs={tabs}
          activeTab={activeTab}
          onChangeTab={onChangeTab}
        />

        <div className="flex flex-col flex-grow gap-6">{activeTab.element}</div>
      </div>
    </>
  );
};

export default MarketTrendsMain;
