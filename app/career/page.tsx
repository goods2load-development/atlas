"use client";

import CareerCard from "../_components/Career/CareerCard/CareerCard";
import CareerForm from "../_components/Career/CareerForm/CareerForm";
import { careerData } from "../_components/Career/careerData";

import LoyaltAllWrapper from "../_components/LoyaltAllWrapper/LoyaltAllWrapper";

const Career: React.FC = () => {
  return (
    <LoyaltAllWrapper>
      <section className="max-w-[1440px] w-full justify-center items-center gap-[40px] py-[40px] sm:py-[104px] px-5 m-auto">
        <div className="flex flex-col gap-[16px] justify-center text-center text-black mb-[20px]">
          <h1 className="font-normal text-[34px]/[40px] sm:text-[48px]/[57.6px] italic text-center flex flex-row justify-center gap-[12px]">
            Join our{" "}
            <div className="font-light not-italic bg-[#FEF1DF] rounded-md h-[40px] sm:h-[49px] px-[4px]">
              team
            </div>
          </h1>
        </div>
        <div className="flex justify-center mb-[40px]">
          <p className="max-w-[800px] text-center font-normal text-black sm:text-[18px]/[25px]">
            Do you have what it takes to challenge the logistics industry with
            us?
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
        <CareerForm />
      </section>
    </LoyaltAllWrapper>
  );
};

export default Career;
