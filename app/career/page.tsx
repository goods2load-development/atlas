"use client";

import CareerForm from "../_components/Career/CareerForm/CareerForm";
import { JoinOurTeam } from "../_components/Career/JoinOurTeam/JoinOurTeam";

import LoyaltAllWrapper from "../_components/LoyaltAllWrapper/LoyaltAllWrapper";

const Career: React.FC = () => {
  return (
    <LoyaltAllWrapper headerVariant="secondary">
      <section className="max-w-[1440px] w-full justify-center items-center gap-[40px] py-[40px] sm:py-[104px] px-5 m-auto">
        <JoinOurTeam />
        <CareerForm />
      </section>
    </LoyaltAllWrapper>
  );
};

export default Career;
