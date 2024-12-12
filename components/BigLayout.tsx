import DynamicMenu from './Header/DynamicMenu';
import HeaderClient from './Header/HeaderClient';
import Line from '@/assets/icons/bg-decor-line.svg';

import { PropsWithChildren } from 'react';

import Image from 'next/image';

export interface IBigLayoutProps extends PropsWithChildren {
  title?: string;
  description?: string;
  introChildren?: React.ReactNode;
}

export default function BigLayout({
  children,
  title = '',
  description = '',
  introChildren = null,
}: IBigLayoutProps) {
  const titleParts = title.split(' ');
  const midIndex = Math.ceil(titleParts.length / 2);

  return (
    <>
      <div className="flex relative flex-col w-full items-center justify-center bg-cover bg-center text-white text-center overflow-x-hidden">
        <div className="flex flex-col w-full items-center justify-start bg-hero-pattern bg-cover bg-center text-white text-center bg-no-repeat min-h-[384px] sm:min-h-[601px] 2xl:min-h-[651px]">
          <HeaderClient className="w-full" variant="transparent" />
          <DynamicMenu variant="transparent" />
          <Image
            className="absolute -left-[30px] -top-[120px] sm:hidden -rotate-20"
            src={Line}
            width={110}
            height={54}
            alt={'line'}
          />
          <Image
            className="absolute -right-[30px] -top-[120px] transform -scale-x-100 sm:hidden rotate-20"
            src={Line}
            width={110}
            height={54}
            alt={'line'}
          />
          {title && (
            <h1 className="text-[40px]/[44px] sm:text-[64px] font-light mb-4 mt-16 sm:mt-10 2xl:mt-28">
              {titleParts.map((part, index) => (
                <span key={index} className={index >= midIndex ? 'italic' : ''}>
                  {part}

                  {index < titleParts.length - 1 && ' '}
                </span>
              ))}
            </h1>
          )}
          {description && (
            <p className="sm:mb-[68px] text-[17px]/[25px] font-light max-w-[323px] sm:max-w-[100%] pb-40 sm:pb-0">
              {description}
            </p>
          )}
          {introChildren}
        </div>

        {children}
      </div>
    </>
  );
}
