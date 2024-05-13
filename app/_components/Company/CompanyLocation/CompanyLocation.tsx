import React from "react";
import location from "@/assets/CompanyLocation.png";
import Image from "next/image";

const CompanyLocation = () => {
  return (
    <section className="max-w-[1440px] w-full flex flex-row gap-[56px] py-[104px] px-[72px]">
      <div className="w-1/2 rounded-lg overflow-hidden grid items-center">
        <Image className="w-full rounded-lg" src={location} alt={"location"} />
      </div>
      <div className="w-1/2 flex flex-col justify-center">
        <h1 className="font-normal text-[48px]/[57.6px] text-black flex flex-row gap-[12px] mb-[24px]">
          Our{" "}
          <div className="font-light italic bg-[#FEF1DF] rounded-[6px] h-[49px] px-[4px] flex justify-center items-center relative bottom-[-5px]">
            locations
          </div>
        </h1>
        <p className="text-[20px]/[28px] font-bold uppercase text-black text-left">
          Goods2load FZ-LLC
        </p>
        <p className="max-w-[72%] text-black font-normal text-[18px]/[25px] mt-[8px] text-left">
          LICENCE NO 47010212 ADDRESS BIZ00921 Compass Buil- ding, Al Shohada
          Road, AL Hamra Industrial Zone-FZ, Ras Al Khaimah, United Arab
          Emirates
        </p>
      </div>
    </section>
  );
};

export default CompanyLocation;
