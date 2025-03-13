import Alliance1Logo from '@/assets/images/DigitalAlliances/SEARATES Partner - Logo.jpg';

import { StaticImageData } from 'next/image';

export interface AllianceData {
  id: string;
  title: string;
  image: StaticImageData;
  link?: string;
}

export const AlliancesData: AllianceData[] = [
  {
    id: '1',
    title: 'dp-world-searates',
    image: Alliance1Logo,
    link: 'https://wa.me/+971505574291',
  },
  // {
  //   id: '2',
  //   title: 'Physical',
  //   image: Alliance3Logo,
  //   link: 'https://www.dpworld.com/',
  // },
  // {
  //   id: '3',
  //   title: 'dp-world',
  //   image: Alliance4Logo,
  // },
];
