'use client';
import { type FC, memo, useState } from 'react';
import CompanyContainer from '@/app/_components/Company/CompanyContainer/CompanyContainer';

type Navigation = 'company' | 'trust' | 'media';
const AboutUsContainer: FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Navigation>('company');

  return (

    <>
      <div
        className='flex flex-col w-full items-center justify-center pt-[47px] bg-hero-pattern bg-cover bg-center text-white text-center'>
        <h1 className='text-[64px] leading-[70px] font-light mb-2 pt-[120px]'>
          About <span className='italic font-normal'>us</span>
        </h1>
        <h2 className='mb-[68px] text-[17px]/[28px] font-light'>
          We help reduce costs, increase efficiency and offer improved customer
          service
        </h2>
        <div className='flex w-fit pb-[190px]'>
          <div
            className={`w-[260px] text-center italic text-[24px]/[31px] font-light h-[57px] relative hover:cursor-pointer ${currentScreen === 'company' && 'font-normal'}`}
            onClick={() => {
              setCurrentScreen('company');
            }}>Company
            {currentScreen === 'company' &&
              <div className={`h-[2px] w-full bg-gradient-to-r from-transparent via-white absolute bottom-0`}></div>}
          </div>
          <div
            className={`w-[260px] text-center italic text-[24px]/[31px] font-light h-[57px] relative hover:cursor-pointer ${currentScreen === 'trust' && 'font-normal'}`}
            onClick={() => {
              setCurrentScreen('trust');
            }}>Trust
            {currentScreen === 'trust' &&
              <div className={`h-[2px] w-full bg-gradient-to-r from-transparent via-white absolute bottom-0`}></div>}
          </div>
          <div
            className={`w-[260px] text-center italic text-[24px]/[31px] font-light h-[57px] relative hover:cursor-pointer ${currentScreen === 'media' && 'font-normal'}`}
            onClick={() => {
              setCurrentScreen('media');
            }}>Media
            {currentScreen === 'media' &&
              <div className={`h-[2px] w-full bg-gradient-to-r from-transparent via-white absolute bottom-0`}></div>}
          </div>
        </div>
      </div>
      {currentScreen === 'company' && <CompanyContainer />}
    </>

  );
};

export default memo(AboutUsContainer);
