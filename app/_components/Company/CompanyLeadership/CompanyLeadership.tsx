import React from "react";
import { leaderships } from "@/app/_components/Company/CompanyLeadership/CompanyLidershipData";
import CompanyLeader from "@/app/_components/Company/CompanyLeadership/CompanyLeader";
import Image from "next/image";
import line from "@/assets/line.svg";
import { Leadership } from "@/app/interface/leaderShip";

export interface ILeader {
  img: string;
  name: string;
  position: string;
  info: string;
}

const CompanyLeadership = () => {
  return (
    <section className="w-full md:flex flex-row gap-[80px] sm:py-[104px] py-20 px-5 md:px-[72px] relative">
      <div className="md:w-1/4 flex flex-col gap-[16px] mb-10 md:mb-0">
        <h1 className="bg-[#FEF1DF] sm:text-[48px]/[57.6px] text-[34px]/[38px]  font-light text-black w-fit rounded-[6px] md:text-left text-center mx-auto sm:ml-0">
          Leadership
        </h1>
        <p className="text-black font-normal text-[17px] sm:text-[18px]/[23.4px] sm:text-left text-center">
          A group of talented professionals who combine their knowledge and
          experience to achieve common goals and meet the needs of our clients
        </p>
      </div>
      <div className="md:w-3/4 flex flex-row flex-wrap justify-center lg:gap-[80px] gap-2 sm:gap-6 w-full">
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
