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
import BigLayout from "@/components/BigLayout";

const Partners = () => {
  return (
    <BigLayout
      title="Engage with businesses throughout their journey of envisioning, strategizing, and arranging bookings"
      description="We help reduce costs, increase efficiency and offer improved
              customer service"
    >
      <div className="w-full flex flex-col justify-center items-center">
        <PartnersStartingFrom />
        <section className="max-w-[1440px] w-full justify-center items-center gap-[40px] py-[40px] sm:py-[104px] px-5 m-auto">
          <JoinOurTeam />
          <CareerForm />
        </section>
        <PartnersAudience />
        <PartnersAmplify />
        <PartnersVisibility />
        <PartnersBoostingTravel />
        <PartnersOurPartners />
      </div>
    </BigLayout>
  );
};
export default Partners;
