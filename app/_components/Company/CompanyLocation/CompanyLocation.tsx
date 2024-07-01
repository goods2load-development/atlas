import React from "react";
import location from "@/assets/CompanyLocation.png";
import Image from "next/image";

const CompanyLocation = () => {
  return (
    <section className="w-full flex flex-col sm:flex-row gap-[56px] py-20 sm:py-[104px] px-5 sm:px-[72px] ">
      <div className="sm:w-1/2 rounded-lg overflow-hidden grid items-center order-2">
        <Image className="w-full rounded-lg" src={location} alt={"location"} />
      </div>
      <div className="sm:w-1/2 flex flex-col justify-center order-1">
        <h1 className="font-normal text-[34px]/[38px] sm:text-[48px]/[57.6px] text-black flex justify-center sm:justify-start flex-row gap-[12px] mb-[24px] mt-8 sm:mt-0">
          Our{" "}
          <div className="font-light italic bg-[#FEF1DF] rounded-[6px] sm:h-[49px] px-[4px] flex justify-center items-center relative sm:bottom-[-5px]">
            locations
          </div>
        </h1>
        <p className="text-[20px]/[28px] font-bold uppercase text-black sm:text-left text-center">
          Goods2load FZ-LLC
        </p>
        <p className="sm:max-w-[72%] text-black font-normal sm:text-[18px]/[25px] mt-[8px] text-center sm:text-left mx-auto sm:ml-0">
          LICENCE NO 47010212 ADDRESS BIZ00921 Compass Buil- ding, Al Shohada
          Road, AL Hamra Industrial Zone-FZ, Ras Al Khaimah, United Arab
          Emirates
        </p>
      </div>
    </section>
  );
};

export default CompanyLocation;
