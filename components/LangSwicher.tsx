import { useLangStore, useUserStore } from '@/lib/store';
import { ILang, langs } from '@/lib/types';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { useEffect, useRef } from 'react';

import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

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
    window.Weglot?.switchTo(lang.label);
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
