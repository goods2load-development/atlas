import React from 'react';
import Image from 'next/image';

import img1 from '@/assets/TrustLogos/logo1.svg';
import img2 from '@/assets/TrustLogos/logo2.svg';
import img3 from '@/assets/TrustLogos/logo3.svg';
import img4 from '@/assets/TrustLogos/logo4.svg';
import img5 from '@/assets/TrustLogos/logo5.svg';
import stars from '@/assets/stars.svg';
import trustpilot from '@/assets/trustpilot.svg';
import google from '@/assets/google.svg';

const TrustReputation = () => {
  return (
    <section className='w-full max-w-[1440px] flex flex-col items-center gap-[16px]'>
      <h1 className='text-black text-center font-light text-[40px]/[48px] flex'>Our
        <div
          className='font-normal italic bg-[#FEF1DF] rounded-md h-[49px] px-[8px] ml-2 flex justify-center items-center'>reputation</div>
        speaks for itself
      </h1>
      <div className='w-full flex flex-row justify-evenly pt-8 pb-5'>
        <Image src={img1} alt={'df mobility'} />
        <Image src={img2} alt={'smp france'} />
        <Image src={img3} alt={'icon'} />
        <Image src={img4} alt={'alimed'} />
        <Image src={img5} alt={'kingsine'} />
      </div>

      <div className='w-fit text-black text-[17px]/[23px] flex flex-row gap-[10px] font-medium pb-4'> <div>1,000+</div><Image className='relative top-[-3px]' src={stars} alt={"stars"}/> <div>reviews</div></div>
      <div className='w-fit flex flex-row gap-4 '> <Image className='relative top-[-3px]' src={trustpilot} alt={"trustpilot"}/> <Image className='relative top-[-3px]' src={google} alt={"google"}/></div>

    </section>
  );
};

export default TrustReputation;
