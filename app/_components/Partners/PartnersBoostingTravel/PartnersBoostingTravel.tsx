import React from "react";

import { dataTeamWork } from "./dataTeamWork";
import { PartnerBoostingTravel } from "@/app/interface/partnerBoostingTravel";

const PartnersBoostingTravel: React.FC = () => {
  return (
    <section className="sm:flex gap-[56px] w-full justify-between pt-8 sm:pt-[47px] text-white text-center mb-[100px] px-5 sm:px-[72px]">
      <div className="w-full">
        <div className="">
          <div className="text-black max-w-[510px] sm:leading-[57px] font-light  mb-[30px] text-[34px]/[38px] sm:text-[40px]/[48px] text-center sm:text-left">
            <span className="w-[400px] font-normal italic pl-[10px] pr-[10px] bg-[#FEF1DF] mr-[10px] rounded-[6px] h-[49px] items-center">
              Boosting Travel:
            </span>
            Using Data and Teamwork <br />
            for your Growth
          </div>
          <p className="sm:text-[18px] text-black w-full max-w-[540px] text-center sm:text-left">
            We convert business activity into actionable intelligence, granting
            all advertising partners access to travel insights <br /> via our
            business intelligence tool. This tool reveals <br /> impactful data
            on search demand, route popularity, and destination trends.
          </p>
        </div>
      </div>
      <div className="sm:grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] sm:gap-[40px] gap-4 w-full items-start mt-10 sm:mt-0 flex flex-wrap justify-between">
        {dataTeamWork.map(
          (
            { descriptionMainData, mainData }: PartnerBoostingTravel,
            i: number
          ) => (
            <div
              key={i}
              className="sm:w-full flex sm:gap-[30px] gap-2 justify-center relative w-[45%]"
            >
              <div className="hidden sm:block text-primaryOrange sm:text-[28px] font-normal pt-[5px] sm:pt-0">
                {`0${i + 1}.`}
              </div>
              <div className="flex flex-col gap-2 sm:gap-40px">
                <div className="text-black text-[18px] sm:text-[20px] font-selium-bold mb-1 text-left pt-[5px]">
                  <span className="mr-1 text-primaryOrange sm:hidden">
                    {" "}
                    {`0${i + 1}.`}
                  </span>
                  <span className="sm:text-[22px]/[28px]">{mainData}</span>
                </div>
                <div className="text-black  text-[14px] sm:text-[16px] text-left w-full">
                  {descriptionMainData}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default PartnersBoostingTravel;
