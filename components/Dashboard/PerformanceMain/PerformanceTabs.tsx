import { PerformaceTab, IPerformanceTab } from "@/app/interface/dashboard";
import { cn } from "@/lib/utils";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronUp } from "lucide-react";

interface PerformanceTabsProps {
  tabs: IPerformanceTab[];
  onChangeTab: (label: PerformaceTab) => void;
  activeTab: PerformaceTab;
}

const PerformanceTabs: React.FC<PerformanceTabsProps> = ({
  tabs,
  onChangeTab,
  activeTab,
}) => {
  return (
    <>
      <ul className="items-center gap-2 mb-10 hidden md:flex">
        {tabs.map((tab, index) => (
          <li
            key={index}
            onClick={() => onChangeTab(tab.label)}
            className={cn(
              "text-md leading-6 opacity-60 relative flex  justify-center cursor-pointer mb-10 whitespace-nowrap",
              "p-4"
            )}
          >
            {tab.label}
            <div
              className={cn(
                "absolute w-[100%] h-[2px] bg-[#FF6720] top-[96%]",
                activeTab === tab.label ? "opacity-100" : "opacity-0"
              )}
            ></div>
          </li>
        ))}
      </ul>

      <div className="mx-auto mb-12 md:hidden verflow-scroll">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger className="p-1 text-white rounded-md flex items-center gap-3 outline-none w-full">
            <div className="flex gap-1 justify-between  p-1 w-full sm:p-2 sm:gap-2">
              <div className="whitespace-nowrap text-black border-primaryOrange border-b-2 pb-2 px-4 min-w-[205px]">
                {tabs.filter((item) => activeTab === item.label)[0].label}
              </div>
              <ChevronUp className="text-black rotate-180" />
            </div>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content className="py-4 bg-white rounded shadow-lg relative z-50 max-h-[300px] overflow-y-auto">
            <ol className="flex flex-col gap-4 px-4">
              {tabs.map(({ label }, idx) => (
                <DropdownMenu.Item
                  className={`outline-none p-2 whitespace-nowrap rounded-md flex gap-2 hover:bg-primaryOrange hover:opacity-80 cursor-pointer hover:text-white transition-all`}
                  key={idx}
                  onSelect={() => onChangeTab(label)}
                >
                  <span>{label}</span>
                </DropdownMenu.Item>
              ))}
            </ol>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </>
  );
};

export default PerformanceTabs;
