import React from "react";
import Image from "next/image";
import phone from "@/assets/PartnersImage/PartnersAudience/phone.png";
import menWithPc from "@/assets/PartnersImage/PartnersAudience/menWithPc.png";

const PartnersAudience: React.FC = () => {
  return (
    <div className="flex w-[1440px] gap-[40px] items-center justify-center pt-[47px]  text-white text-center mb-[100px]">
      <div className="w-full flex justify-center">
        <div>
          <div className="italic text-[16px] text-left text-black">
            The power of connection
          </div>
          <div className="text-black w-[520px] leading-[57px] font-light  mb-[30px] text-[40px]/[48px] text-left">
            Reach your target{" "}
            <span className="w-[400px] font-normal italic pl-[10px] pr-[10px] bg-[#FEF1DF] mr-[10px] rounded-[6px] h-[49px] items-center">
              audience
            </span>{" "}
            where they’re most active
          </div>
          <p className="text-[18px] text-black w-full max-w-[576px] text-left">
            The new generation increasingly conducts research on their small
            screens to find the perfect co-pilot to elevate their business. At
            our platform, we’ve got you covered. Our ads drive a higher number
            of clicks, seamlessly guiding users from their search to your
            booking page in just a few clicks
          </p>
        </div>
      </div>
      <div className="w-full flex justify-center relative">
        <div className="absolute left-0  bottom-0 transform translate-x-[-197px] translate-y-[65px]">
          <Image src={phone} alt={"phone"} />
        </div>
        <Image src={menWithPc} alt={"menWithPc"} />
      </div>
    </div>
  );
};
export default PartnersAudience;
