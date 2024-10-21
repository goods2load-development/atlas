import media1 from '@/assets/Media/img.png';
import media2 from '@/assets/Media/img_1.png';
import media3 from '@/assets/Media/img_2.png';
import media4 from '@/assets/Media/img_3.png';

import { StaticImageData } from 'next/image';

export const media: {
  img: StaticImageData;
  title: string;
  date: string;
  link: string;
}[] = [
  {
    img: media1,
    title: '“Cargo talk”',
    date: 'January 2024',
    link: 'https://www.cargotalkgcc.com/_files/ugd/273c96_e3930dfc1b134404b66b1cc3e4b9c4ab.pdf',
  },
  {
    img: media2,
    title: '“Cargo talk”',
    date: 'December 2023',
    link: 'https://online.fliphtml5.com/yzsfr/wwvh/#p=1',
  },
  {
    img: media3,
    title: '“Cargo talk”',
    date: 'November 2023',
    link: 'https://www.cargotalkgcc.com/_files/ugd/273c96_96ad1b04a8264a68b38252bfc48bc778.pdf',
  },
  {
    img: media4,
    title: '“Cargo talk”',
    date: 'February 2024',
    link: 'https://www.cargotalkgcc.com/_files/ugd/273c96_2b59f03e005141b7b93d2cde8e24fcf6.pdf',
  },
];
