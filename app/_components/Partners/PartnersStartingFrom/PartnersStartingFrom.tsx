import React from "react";
import Image from "next/image";
import menWithBox from "@/assets/PartnersImage/PartnersStartingFrom/menWithBox.png";

const PartnersStartingFrom: React.FC = () => {
  return (
    <section className="sm:flex w-full flex-row gap-[56px] pt-[104px] px-5 sm:px-[72px] items-center">
      <div className="sm:w-1/2">
        <Image
          className="w-full"
          alt="menWithBox"
          src={menWithBox.src}
          width={menWithBox.width}
          height={menWithBox.height}
        />
      </div>
      <div className="sm:w-1/2">
        <div className="text-black w-max-[620px] leading-[57px] font-light  mb-[30px] text-[40px]/[48px] text-left">
          <span className="w-max-[400px] font-normal italic pl-[10px] pr-[10px] bg-[#FEF1DF] mr-[10px] rounded-[6px] items-center">
            Starting from 0
          </span>
          never been easy but we will never forget how it feels
        </div>
        <p className="text-[18px] text-black w-full max-w-[650px] text-left">
          Consistency, coupled with the right strategies, paves the way for
          significant achievements. Building and nurturing relationships as we
          grow ensures lasting bonds that withstand the test of time.
        </p>
      </div>
    </section>
  );
};
export default PartnersStartingFrom;
