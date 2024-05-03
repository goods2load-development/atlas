import React from 'react';
import { leaderships } from '@/app/_components/Company/CompanyLeadership/CompanyLidershipData';
import CompanyLeader from '@/app/_components/Company/CompanyLeadership/CompanyLeader';
import Image from 'next/image';
import line from '@/assets/line.svg';
import { Leadership } from '@/app/interface/leaderShip';

export interface ILeader {
  img: string;
  name: string;
  position: string;
  info: string;
}

const CompanyLeadership = () => {
  return (
    <section className="max-w-[1440px] w-full flex flex-row gap-[80px] py-[104px] relative">
      <div className="w-1/4 flex flex-col gap-[16px]">
        <h1 className="bg-[#FEF1DF] text-[48px]/[57.6px] font-light text-black w-fit rounded-[6px]">
          Leadership
        </h1>
        <p className="text-black font-normal text-[18px]/[23.4px] text-left">
          A group of talented professionals who combine their knowledge and
          experience to achieve common goals and meet the needs of our clients
        </p>
      </div>
      <div className="w-3/4 flex flex-row gap-[80px] justyfe">
        {leaderships.map((item: Leadership) => (
          <CompanyLeader key={item.name} item={item} />
        ))}
      </div>
      <Image
        className="absolute bottom-0 left-[-15%]"
        src={line}
        alt={"line"}
      />
    </section>
  );
};

export default CompanyLeadership;
