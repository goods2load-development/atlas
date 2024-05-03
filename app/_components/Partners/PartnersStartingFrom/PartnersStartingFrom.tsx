import React from "react";
import Image from "next/image";
import menWithBox from "@/assets/PartnersImage/PartnersStartingFrom/menWithBox.png";

const PartnersStartingFrom: React.FC = () => {
  return (
    <div className=" flex w-[1440px] items-center justify-center pt-[47px]  text-white text-center mb-[70px]">
      <div className="w-full flex justify-center">
        <Image src={menWithBox} alt={"menWithBox"} />
      </div>
      <div className="w-full flex justify-center">
        <div className="">
          <div className="text-black w-[620px] leading-[57px] font-light  mb-[30px] text-[40px]/[48px] text-left">
            <span className="w-[400px] font-normal italic pl-[10px] pr-[10px] bg-[#FEF1DF] mr-[10px] rounded-[6px] h-[49px] items-center">
              Starting from 0
            </span>
            never been easy but we will never forget how it feels
          </div>
          <p className="text-[18px] text-black w-full max-w-[650px]">
            Consistency, coupled with the right strategies, paves the way for
            significant achievements. Building and nurturing relationships as we
            grow ensures lasting bonds that withstand the test of time.
          </p>
        </div>
      </div>
    </div>
  );
};
export default PartnersStartingFrom;
