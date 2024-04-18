import { type FC, memo, useState } from 'react';

const NAVIGATION = [];

type Navigation = 'company' | 'trust' | 'media';
const AboutUsContainer: FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Navigation>('company');

  return (
    <main className='flex min-h-screen flex-col items-center justify-between'>
      <div className='flex-row w-full items-center justify-center px-[196px] pt-[47px] pb-[68px] bg-primaryOrange text-white text-center'>
        <h1 className='text-[64px] leading-[70px] font-light mb-2'>
          About <span className='italic font-normal'>us</span>
        </h1>
        <h2 className='mb-[68px] text-[17px]/[28px] font-light'>
          We help reduce costs, increase efficiency and offer improved customer
          service
        </h2>
      </div>
    </main>
  );
};

export default memo(AboutUsContainer);
