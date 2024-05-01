import React from "react";
import Image from "next/image";

import pcImage from "@/assets/PartnersImage/PartnersVisibility/pc.png";
import phoneImage from "@/assets/PartnersImage/PartnersVisibility/phone.png";
import tabImage from "@/assets/PartnersImage/PartnersVisibility/tab.png";

const PartnersVisibility: React.FC = () => {
  return (
    <div className=" w-[1440px] items-center justify-center pt-[47px]  text-white text-center mb-[100px]">
      <div className="mb-[40px]">
        <div className="text-black text-[40px] font-semibold italic">
          “Nice{" "}
          <span className="text-40 leading-48 font-normal text-[40px]">
            and
          </span>{" "}
          easy”
        </div>
        <div className="text-black">is our motto</div>
      </div>
      <div className="flex mb-[100px]">
        <div className="w-full flex justify-center">
          <div className="">
            <h2 className="text-black w-[560px] leading-[57px] font-light  mb-[10px] text-[40px]/[48px] text-left">
              <span className="w-[400px] font-normal italic pl-[10px] pr-[10px] bg-[#FEF1DF] mr-[10px] rounded-[6px] h-[49px] items-center">
                Visibility
              </span>{" "}
              in search results can truly set you apart
            </h2>
            <p className="text-[18px] text-black w-full max-w-[570px] text-left">
              Position your company on relevant research result pages and link
              directly to your website’s booking page.
            </p>
          </div>
        </div>
        <div className="w-full flex justify-center relative">
          <div className="absolute left-0  bottom-0 transform translate-x-[-190px] translate-y-[45px] translate-x-[-150px]">
            <Image src={phoneImage} alt={"phone"} />
          </div>
          <Image src={pcImage} alt={"menWithPc"} />
        </div>
      </div>
      <div className="flex items-center">
        <div className="w-full flex justify-center relative">
          <Image src={tabImage} alt={"menWithPc"} />
        </div>
        <div className="w-full max-w-[620px]">
          <div className="w-full max-w-[570px] text-black text-[18px] w-[620px] text-left mb-[30px]">
            Engage your audience, enhance business growth, fortify brand
            recognition, and drive significant traffic with <br /> our dynamic
            static display ads
          </div>
          <div className="w-full max-w-[580px] text-black text-[18px] w-[620px] text-left">
            Display banners enable showcasing business imagery
            <br /> and pricing plans, grabbing attention and illustrating the
            cost-effectiveness of logistic services on product impact.
          </div>
        </div>
      </div>
    </div>
  );
};
export default PartnersVisibility;
