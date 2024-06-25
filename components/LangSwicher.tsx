import { useEffect, useState } from "react";
import Image from "next/image";
import frFlag from "@/assets/fr-flag.svg";
import deFlag from "@/assets/de-flag.svg";
import enFlag from "@/assets/en-flag.svg";
import esFlag from "@/assets/es-flag.svg";
import { ChevronDown } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useLangStore } from "@/lib/store";

export const LOCAL_STORAGE_KEY_LANG = "lang";

export enum Langs {
  EN = "en",
  FR = "fr",
  DE = "de",
  ES = "es",
}

export interface ILang {
  label: Langs;
  icon: string;
}

export const langs: ILang[] = [
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
  const { lang, setLang, initializeLang } = useLangStore();

  const onChangeLang = (elem: ILang) => {
    setLang(elem);
  };

  useEffect(() => {
    initializeLang();
  }, []);

  useEffect(() => {
    Weglot?.switchTo(lang.label);
  }, [lang]);

  return (
    <div key={lang.label}>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="outline-none">
          <div className="flex gap-2 items-center">
            <Image alt="franch-flag" width={16} height={12} src={lang.icon} />
            <span className="uppercase">{lang.label}</span>
            <ChevronDown />
          </div>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="bg-white rounded p-1 mt-1">
          {langs.map((elem, idx) => {
            if (elem === lang) {
              return;
            }

            return (
              <DropdownMenu.Item
                className={`group flex gap-2 items-center justify-between outline-none py-1 px-3 cursor-pointer rounded hover:bg-primaryOrange`}
                key={idx}
                onSelect={() => onChangeLang(elem)}
              >
                <Image
                  alt="franch-flag"
                  width={16}
                  height={12}
                  src={elem.icon}
                />
                <span className="uppercase text-black">{elem.label}</span>
              </DropdownMenu.Item>
            );
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
};

export default LangSwitcher;
