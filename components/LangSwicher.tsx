'use client';

import { useLangStore, useUserStore } from '@/lib/store';
import { COOKIE_KEY_LANG, ILang, Langs, langs } from '@/lib/types';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { useEffect } from 'react';

import Cookies from 'js-cookie';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

const loadWeglotScripts = (onWeglotLoad: () => void) => {
  return new Promise<void>((resolve, reject) => {
    const mainScript = document.createElement('script');
    mainScript.src = 'https://cdn.weglot.com/weglot.min.js';
    mainScript.async = true;
    mainScript.onload = () => {
      onWeglotLoad();
      const initScript = document.createElement('script');
      initScript.id = 'weglot-init';
      initScript.type = 'text/javascript';

      initScript.innerHTML = `
        Weglot.initialize({
          api_key: '${process.env.NEXT_PUBLIC_WEGLOT_API_KEY}'
        });
      `;
      initScript.onload = () => {
        resolve();
      };
      initScript.onerror = (e) => {
        reject(e);
      };
      document.head.appendChild(initScript);
    };

    mainScript.onerror = (e) => {
      reject(e);
    };

    document.head.appendChild(mainScript);
  });
};

const LangSwitcher = () => {
  const { lang, setLang } = useLangStore();

  const { user, updateUser }: any = useUserStore();

  const onChangeLang = async (elem: ILang) => {
    Cookies.set(COOKIE_KEY_LANG, elem.label, { expires: 365 });
    setLang(elem);

    if (user?.id) {
      await updateUser({
        ...user,
        language: elem.label,
      });
    }

    const switchAndReload = () => {
      window.Weglot.switchTo(elem.label);
      if (elem.label === Langs.EN)
        setTimeout(() => window.location.reload(), 1000);
      window.Weglot.on('languageChanged', () => window.location.reload());
    };

    if (!window.Weglot) {
      loadWeglotScripts(() => {
        window.Weglot.on('initialized', switchAndReload);
      });
    }

    switchAndReload();
  };

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
