import React from "react";
import Image from "next/image";

import shipImg from "@/assets/AboutUsImg/ship.png";
import thereIsNotImg from "@/assets/AboutUsImg/thereIsNot.png";

const CompanyArticle = () => {
  return (
    <section className="max-w-[1440px] w-full flex flex-col gap-[64px] px-[72px]">
      <div className="w-full flex flex-row gap-[56px] h-[382px]">
        <div className="w-6/12 h-[382px] rounded-lg overflow-hidden">
          <Image
            className="w-full rounded-lg translate-y-[-10%]"
            src={shipImg}
            alt={"img1"}
          />
        </div>
        <div className="w-6/12 flex flex-col justify-center gap-[16px]">
          <p className="text-black font-normal text-[18px]/[25px] text-left">
            At GOODS2LOAD, we have developed a proprietary algorithm that offers
            a deep understanding of the logistics landscape. Our automated
            platform swiftly compares thousands of quotes and services from
            renowned international logistics companies in mere seconds,
            presenting our clients with the most efficient and effective option
            for their desired route and preferred service type.{" "}
          </p>
          <p className="text-black font-normal text-[18px]/[25px] text-left">
            Moreover, we take pride in our prenegotiated quotes, meaning that we
            have already undertaken the arduous task of securing the best rates
            for our clients. Our digital booking system streamlines the entire
            process with just few clicks.
          </p>
        </div>
      </div>
      <div className="w-full flex flex-row gap-[56px] h-[382px]">
        <div className="w-6/12 flex flex-col justify-center gap-[16px]">
          <p className="text-black font-normal text-[18px]/[25px] text-left">
            Understanding the Earth’s limited resources, logistics forwarders
            now place a premium on CO2 emission management. GOODS2LOAD is
            steadfast in charting a sustainable course for future businesses,
            with a strong focus on environmental responsibility and reducing CO2
            emissions.{" "}
          </p>
        </div>

        <div className="w-6/12 rounded-lg overflow-hidden">
          <Image
            className="w-full rounded-lg translate-y-[-10%]"
            src={thereIsNotImg}
            alt={"img2"}
          />
        </div>
      </div>
    </section>
  );
};

export default CompanyArticle;
