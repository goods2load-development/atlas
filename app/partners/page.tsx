import React from "react";

import PartnersStartingFrom from "../_components/Partners/PartnersStartingFrom/PartnersStartingFrom";
import PartnersAudience from "../_components/Partners/PartnersAudience/PartnerAudience";
import PartnersVisibility from "../_components/Partners/PartnersVisibility/PartnersVisibility";
import PartnersOurPartners from "../_components/Partners/PartnersOurPartners/PartnersOurPartners";
import PartnersBoostingTravel from "../_components/Partners/PartnersBoostingTravel/PartnersBoostingTravel";
import PartnersAmplify from "../_components/Partners/PartnersAmplify/PartnersAmplify";

import LoyaltAllWrapper from "../_components/LoyaltAllWrapper/LoyaltAllWrapper";

const Partners: React.FC = () => {
  return (
    <LoyaltAllWrapper>
      <div className="flex flex-col w-full items-center justify-center pt-[47px] text-white text-center pb-[100px]">
        <div className="absolute top-0 flex flex-col w-full items-center justify-center pt-[47px] bg-hero-pattern bg-cover bg-center text-white text-center pb-[300px] max-h-[700px]">
          <div className="flex flex-col w-full w-[1440px] items-center justify-center pt-[47px]  text-white text-center pb-[100px]">
            <h1 className="text-[48px] leading-[57px] font-light mb-2 pt-[120px] mb-[30px] max-w-[1000px]">
              Engage with businesses throughout their journey of envisioning,
              strategizing, <span className="italic">and</span>{" "}
              <span className="italic">arranging bookings</span>
            </h1>
            <h2 className="mb-[68px] text-[17px]/[28px] font-light leading-[28px]">
              We help reduce costs, increase efficiency and offer improved
              customer service
            </h2>
          </div>
        </div>

        <div className="w-full flex flex-col justify-center items-center mt-[600px]">
          <PartnersStartingFrom />
          <PartnersAudience />
          <PartnersAmplify />
          <PartnersVisibility />
          <PartnersBoostingTravel />
          <PartnersOurPartners />
        </div>
      </div>
    </LoyaltAllWrapper>
  );
};
export default Partners;
