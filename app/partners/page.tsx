import React from "react";

import PartnersStartingFrom from "../_components/Partners/PartnersStartingFrom/PartnersStartingFrom";
import PartnersAudience from "../_components/Partners/PartnersAudience/PartnerAudience";
import PartnersVisibility from "../_components/Partners/PartnersVisibility/PartnersVisibility";
import PartnersOurPartners from "../_components/Partners/PartnersOurPartners/PartnersOurPartners";
import PartnersBoostingTravel from "../_components/Partners/PartnersBoostingTravel/PartnersBoostingTravel";
import PartnersAmplify from "../_components/Partners/PartnersAmplify/PartnersAmplify";

import LoyaltAllWrapper from "../_components/LoyaltAllWrapper/LoyaltAllWrapper";
import { JoinOurTeam } from "../_components/Career/JoinOurTeam/JoinOurTeam";
import CareerForm from "../_components/Career/CareerForm/CareerForm";

const Partners = () => {
  return (
    <LoyaltAllWrapper>
      <div className="flex flex-col w-full items-center justify-center text-white text-center pb-[100px] md:mt-[-75px]">
        <div className="flex flex-col w-full items-center justify-center bg-primaryOrange md:bg-transparent bg-partners-mobile md:bg-hero-pattern bg-cover bg-center text-white text-center md:max-h-[700px] -z-10 relative">
          <div className="flex flex-col w-full items-center justify-center pt-10 md:pt-[47px] text-white text-center pb-[20px] md:pb-[100px]">
            <h1 className="text-[30px]/[34px] md:text-[48px]/[57px] font-light md:pt-[150px] mb-[40px] max-w-[1000px]">
              Engage with businesses throughout their journey of envisioning,
              strategizing, <span className="italic">and</span>{" "}
              <span className="italic">arranging bookings</span>
            </h1>
            <h2 className="mb-[20px] md:mb-[68px] text-[17px]/[28px] font-light leading-[28px]">
              We help reduce costs, increase efficiency and offer improved
              customer service
            </h2>
          </div>
        </div>

        <div className="w-full bg-gradient-to-b from-primaryOrange to-white relative h-[50px] md:hidden -top-[10px]"></div>

        <div className="w-full flex flex-col justify-center items-center">
          <PartnersStartingFrom />
          <section className="max-w-[1440px] w-full justify-center items-center gap-[40px] py-[40px] md:py-[104px] px-5 m-auto">
            <JoinOurTeam />
            <CareerForm />
          </section>
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
