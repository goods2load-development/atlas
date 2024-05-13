import React from "react";

import { dataTeamWork } from "./dataTeamWork";
import { PartnerBoostingTravel } from "@/app/interface/partnerBoostingTravel";

const PartnersBoostingTravel: React.FC = () => {
  return (
    <div className="flex gap-[56px] w-full justify-between pt-[47px] text-white text-center mb-[100px] px-[72px]">
      <div className="w-full">
        <div className="">
          <div className="text-black w-[510px] leading-[57px] font-light  mb-[30px] text-[40px]/[48px] text-left">
            <span className="w-[400px] font-normal italic pl-[10px] pr-[10px] bg-[#FEF1DF] mr-[10px] rounded-[6px] h-[49px] items-center">
              Boosting Travel:
            </span>
            Using Data and Teamwork <br />
            for your Growth
          </div>
          <p className="text-[18px] text-black w-full max-w-[540px] text-left">
            We convert business activity into actionable intelligence, granting
            all advertising partners access to travel insights <br /> via our
            business intelligence tool. This tool reveals <br /> impactful data
            on search demand, route popularity, and destination trends.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-[40px] w-full items-start">
        {dataTeamWork.map(
          (
            { descriptionMainData, mainData }: PartnerBoostingTravel,
            i: number
          ) => (
            <div
              key={i}
              className="w-full flex gap-[30px] justify-center relative"
            >
              <div className="text-primaryOrange text-[28px] font-normal">
                {`0${i + 1}`}
              </div>
              <div className="flex flex-col gap-40px">
                <div className="text-black text-[20px] font-selium-bold mb-[20px] text-left pt-[5px]">
                  {mainData}
                </div>
                <div className="text-black text-[16px] text-left">
                  {descriptionMainData}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default PartnersBoostingTravel;
