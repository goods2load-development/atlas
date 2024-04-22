'use client';
import { type FC, memo, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import CompanyContainer from '@/app/_components/Company/CompanyContainer/CompanyContainer';
import TrustContainer from '@/app/_components/Trust/TrustContainer/TrustContainer';
import MediaContainer from '@/app/_components/MediaContainer/MediaContainer';

type Navigation = 'company' | 'trust' | 'media';
const AboutUsContainer: FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Navigation>('company');
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();


  useEffect(() => {
    const tab = searchParams.get('tab');
    setCurrentScreen(tab);
  }, [searchParams]);

  const handleSetQuery = (tab: Navigation) =>{
    setCurrentScreen(tab);
    router.push(pathname + '?tab=' + tab);
  }

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
            onClick={()=> handleSetQuery('company')}>Company
            {currentScreen === 'company' &&
              <div className={`h-[2px] w-full bg-gradient-to-r from-transparent via-white absolute bottom-0`}></div>}
          </div>
          <div
            className={`w-[260px] text-center italic text-[24px]/[31px] font-light h-[57px] relative hover:cursor-pointer ${currentScreen === 'trust' && 'font-normal'}`}
            onClick={() => handleSetQuery('trust')}>Trust
            {currentScreen === 'trust' &&
              <div className={`h-[2px] w-full bg-gradient-to-r from-transparent via-white absolute bottom-0`}></div>}
          </div>
          <div
            className={`w-[260px] text-center italic text-[24px]/[31px] font-light h-[57px] relative hover:cursor-pointer ${currentScreen === 'media' && 'font-normal'}`}
            onClick={() => handleSetQuery('media')}>Media
            {currentScreen === 'media' &&
              <div className={`h-[2px] w-full bg-gradient-to-r from-transparent via-white absolute bottom-0`}></div>}
          </div>
        </div>
      </div>
      {currentScreen === 'company' && <CompanyContainer />}
      {currentScreen === 'trust' && <TrustContainer />}
      {currentScreen === 'media' && <MediaContainer />}
    </>

  );
};

export default memo(AboutUsContainer);
