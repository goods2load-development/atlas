import arFlag from '@/assets/ar-flag.svg';
import cnFlag from '@/assets/cn-flag.svg';
import enFlag from '@/assets/en-flag.svg';
import inFlag from '@/assets/in-flag.svg';
import { useLangStore, useUserStore } from '@/lib/store';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { useCallback, useEffect, useRef, useState } from 'react';

import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

export const LOCAL_STORAGE_KEY_LANG = 'lang';

export enum Langs {
  EN = 'en',
  AR = 'ar',
  IN = 'hi',
  CN = 'zh',
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
    label: Langs.AR,
    icon: arFlag,
  },
  {
    label: Langs.CN,
    icon: cnFlag,
  },
  {
    label: Langs.IN,
    icon: inFlag,
  },
];

const LangSwitcher = () => {
  const { lang, setLang, initializeLang } = useLangStore();
  let reloadTimer = useRef<ReturnType<typeof setTimeout>>();
  const { user, updateUser }: any = useUserStore();

  const onChangeLang = async (elem: ILang) => {
    setLang(elem);

    if (user?.id) {
      await updateUser({
        ...user,
        language: elem.label,
      });
    }

    reloadTimer.current = setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  useEffect(() => {
    initializeLang();

    return () => {
      clearTimeout(reloadTimer.current);
    };
  }, []);

  useEffect(() => {
    Weglot?.switchTo(lang.label);
  }, [lang]);

  useEffect(() => {
    if (user?.id) {
      setLang(langs.filter((elem) => elem.label === user.language)[0]);
    }
  }, [user]);

  if (!lang) {
    return;
  }

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
