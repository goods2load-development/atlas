import arFlag from '@/assets/icons/ar-flag.svg';
import cnFlag from '@/assets/icons/cn-flag.svg';
import enFlag from '@/assets/icons/en-flag.svg';
import inFlag from '@/assets/icons/in-flag.svg';

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
