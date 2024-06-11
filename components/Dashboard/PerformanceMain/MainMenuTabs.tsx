import { IMainMenuItemTab } from "@/app/interface/dashboard";
import { cn } from "@/lib/utils";

interface MainMenuTabsProps {
  tabs: IMainMenuItemTab[];
  handleTabClick: (name: string) => void;
}

const MainMenuTabs: React.FC<MainMenuTabsProps> = ({
  tabs,
  handleTabClick,
}) => {
  return (
    <ul className="flex items-center gap-2 mb-10">
      {tabs.map((tab) => (
        <li
          onClick={() => handleTabClick(tab.label)}
          className={cn(
            "text-md leading-6 opacity-60 relative flex  justify-center cursor-pointer mb-10",
            "p-4"
          )}
        >
          {tab.label}
          <div
            className={cn(
              "absolute w-[100%] h-[2px] bg-[#FF6720] top-[96%]",
              tab.active ? "opacity-100" : "opacity-0"
            )}
          ></div>
        </li>
      ))}
    </ul>
  );
};

export default MainMenuTabs;
