import DynamicMenu from './Header/DynamicMenu';
import HeaderClient from './Header/HeaderClient';

import { PropsWithChildren } from 'react';

export interface IBigLayoutProps extends PropsWithChildren {
  title: string;
  description?: string;
}

export default function BigLayout({
  children,
  title = '',
  description = '',
}: IBigLayoutProps) {
  const titleParts = title.split(' ');
  const midIndex = Math.ceil(titleParts.length / 2);

  return (
    <>
      <div className="flex relative flex-col w-full items-center justify-center bg-cover bg-center text-white text-center">
        <div className="flex flex-col w-full items-center justify-center sm:bg-hero-pattern bg-cover bg-center text-white text-center sm:pb-[240px] md:pb-[230px] pb-[170px]">
          <HeaderClient className="w-full" variant="transparent" />
          <DynamicMenu variant="transparent" />
          <h1 className="text-[38px]/[42px] sm:text-[64px] sm:leading-[70px] font-light mb-2 sm:pt-[80px]">
            {titleParts.map((part, index) => (
              <span key={index} className={index >= midIndex ? 'italic' : ''}>
                {part}

                {index < titleParts.length - 1 && ' '}
              </span>
            ))}
          </h1>
          {description && (
            <h2 className="sm:mb-[68px] text-[17px]/[25px] font-light max-w-[323px] sm:max-w-[100%]">
              {description}
            </h2>
          )}
          <div className="sm:hidden absolute w-full h-[337px] bg-primaryOrange bg-hero-pattern-mobile bg-cover -z-10"></div>
        </div>

        {children}
      </div>
    </>
  );
}
