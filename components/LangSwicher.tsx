import { useState } from "react";
import Image from "next/image";
import frFlag from "@/assets/fr-flag.svg";
import deFlag from "@/assets/de-flag.svg";
import enFlag from "@/assets/en-flag.svg";
import esFlag from "@/assets/es-flag.svg";
import { ChevronDown } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

enum Langs {
  EN = "en",
  FR = "fr",
  DE = "de",
  ES = "es",
}

interface ILang {
  label: Langs;
  icon: string;
}

const langs: ILang[] = [
  {
    label: Langs.EN,
    icon: enFlag,
  },
  {
    label: Langs.DE,
    icon: deFlag,
  },
  {
    label: Langs.FR,
    icon: frFlag,
  },
  {
    label: Langs.ES,
    icon: esFlag,
  },
];

const LangSwitcher = () => {
  const [activeLang, setActiveLang] = useState<ILang>(langs[0]);

  const onChangeLang = (elem: ILang) => {
    setActiveLang(elem);
    Weglot.switchTo(elem.label);
  };

  return (
    <div key={activeLang.label}>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="outline-none">
          <div className="flex gap-2 items-center">
            <Image
              alt="franch-flag"
              width={16}
              height={12}
              src={activeLang.icon}
            />
            <span className="uppercase">{activeLang.label}</span>
            <ChevronDown />
          </div>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="border-2 border-white rounded p-1 mt-1">
          {langs.map((elem, idx) => {
            if (elem === activeLang) {
              return;
            }

            return (
              <DropdownMenu.Item
                className={`flex gap-2 items-center justify-between outline-none py-1 px-3 hover:opacity-80 cursor-pointer rounded`}
                key={idx}
                onSelect={() => onChangeLang(elem)}
              >
                <Image
                  alt="franch-flag"
                  width={16}
                  height={12}
                  src={elem.icon}
                />
                <span className="uppercase">{elem.label}</span>
              </DropdownMenu.Item>
            );
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
};

export default LangSwitcher;
