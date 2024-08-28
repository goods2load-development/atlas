"use client";

import CareerCard from "../CareerCard/CareerCard";
import { careerData } from "../careerData";

export const JoinOurTeam = () => {
  return (
    <>
      <div className="flex flex-col gap-[16px] justify-center text-center text-black mb-[20px]">
        <h1 className="font-light text-[34px]/[40px] sm:text-[48px]/[57.6px] text-center flex flex-row justify-center gap-[12px]">
          Join our{" "}
          <div className="flex items-center justify-center font-normal not-italic bg-[#FEF1DF] rounded-md h-[40px] sm:h-[49px] px-[6px] mt-[5px]">
            <i>team</i>
          </div>
        </h1>
      </div>
      <div className="flex justify-center mb-[40px]">
        <p className="max-w-[800px] text-center font-normal text-black sm:text-[18px]/[25px]">
          Do you have what it takes to challenge the logistics industry with us?
          <br />
          Send your application right away
        </p>
      </div>
      <div className="flex gap-5 sm:gap-[40px] flex-wrap justify-center mb-[40px]">
        {careerData?.map((item, i) => (
          // eslint-disable-next-line react/jsx-key
          <CareerCard key={i} pesonalInfo={item} />
        ))}
      </div>
    </>
  );
};
