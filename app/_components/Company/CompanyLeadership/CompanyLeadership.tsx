import React from 'react';
import { leaderships } from '@/app/_components/Company/CompanyLeadership/CompanyLidershipData';
import CompanyLeader from '@/app/_components/Company/CompanyLeadership/CompanyLeader';

export interface ILeader {
  img: String,
  name: string,
  position: string
}

const CompanyLeadership = () => {
  return (
    <section className='max-w-[1440px] w-full flex flex-row gap-[80px] py-[104px]'>
      <div className='w-1/4 flex flex-col gap-[16px]'>
        <h1 className='bg-[#FEF1DF] text-[48px]/[57.6px] font-light text-black w-fit rounded-md'>Leadership</h1>
        <p className='text-black font-normal text-[18px]/[23.4px]'>A group of talented professionals who combine their
          knowledge and experience to achieve common goals and meet
          the needs of our clients</p>
      </div>
      <div className='w-3/4 flex flex-row gap-[80px]'>
        {leaderships.map(item => <CompanyLeader key={item.name} item={item} />)}
      </div>

    </section>
  );
};

export default CompanyLeadership;
