import React, { FC } from 'react';
import { ILeader } from '@/app/_components/Company/CompanyLeadership/CompanyLeadership';
import Image from 'next/image';
import arrow from '@/assets/arrow.svg';

type TItem = {
  item: ILeader
}

const CompanyLeader: FC<TItem> = ({ item }) => {
  return (
    <div className='w-full'>
      <div className='w-full relative w-fit h-fit mb-[18px]'>
        <Image src={item.img} alt={item.name} className='rounded-full' />
        <div
          className='bg-primaryOrange w-[64px] h-[64px] flex justify-center items-center rounded-full absolute bottom-0 right-[15%] hover:cursor-pointer'>
          <Image src={arrow} alt={'arrow'} /></div>
      </div>
      <div className='flex flex-col items-center gap-[8px]'>
        <h3 className='w-fit text-black text-[25px]/[22px] font-medium'>{item.name}</h3>
        <p className='max-w-[220px] text-center text-black text-[18px]/[23.4px] font-normal'>{item.position}</p>
      </div>

    </div>
  );
};

export default CompanyLeader;
