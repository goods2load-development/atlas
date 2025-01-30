import Alliance2Logo from '@/assets/images/DigitalAlliances/dp-world.png';
import Alliance4Logo from '@/assets/images/DigitalAlliances/dp-world.png';
import Alliance3Logo from '@/assets/images/DigitalAlliances/jtrans.png';

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
    title: 'dp-world',
    image: Alliance2Logo,
    link: 'https://www.dpworld.com/',
  },
  {
    id: '2',
    title: 'Physical',
    image: Alliance3Logo,
    link: 'https://www.dpworld.com/',
  },
  {
    id: '3',
    title: 'dp-world',
    image: Alliance4Logo,
  },
];
