"use client";

import LoyaltAllWrapper from "@/app/_components/LoyaltAllWrapper/LoyaltAllWrapper";
import Image from "next/image";
import { useEffect } from "react";
import PartnerLogoDefault from "@/assets/Partners/partner-logo-default.jpg";
import { ChartsComponent } from "@/app/_components/Partner/ChartsCompoenent/ChartComponent";
import { GoogleRatingBunner } from "@/app/_components/Partner/GoogleRatingBunner/GoogleRatingBunner";
import { Review } from "@/app/_components/Partner/Review/Review";
import { AchiveBlock } from "@/app/_components/Partner/AchiveBlock/AchiveBlock";

const Partner = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  useEffect(() => {
    console.log(id);
  }, []);

  return (
    <LoyaltAllWrapper>
      <section className="flex relative flex-col w-full items-center justify-center bg-cover bg-center text-white text-center sm:mt-[-75px]">
        <div className="flex flex-col w-full items-center justify-center sm:pt-[47px] pt-10 sm:bg-hero-pattern bg-cover bg-center text-white text-center sm:pb-[240px] md:pb-[230px] pb-[170px] realtive">
          <h1 className="text-[38px]/[42px] sm:text-[64px] sm:leading-[70px] font-light mb-2 sm:pt-[120px]">
            Partner
          </h1>
          <div className="sm:hidden absolute w-full h-[337px] bg-primaryOrange bg-hero-pattern-mobile bg-cover -z-10"></div>
          <div className="hidden 2xl:block absolute w-full h-[150px] top-[35%] bg-bgWhiteGradient"></div>
        </div>

        <div className="max-w-[1295px] mx-auto pt-[72px] pb-[250px]">
          <div className="flex gap-14 justify-between mb-[104px]">
            <Image
              width={633}
              height={487}
              src={PartnerLogoDefault}
              alt="Partner logo"
            />

            <div className="pt-7 text-black text-left max-w-[606px]">
              <h3 className="text-[48px]/[57.6px] font-light mb-8">
                Goods2Load
              </h3>
              <div className="font-medium text-[28px]/[33px] mb-4">
                About us
              </div>
              <p className="mb-4 text-[18px]/[26px]">
                Lorem ipsum dolor sit amet consectetur. Vehicula justo enim
                massa morbi lectus odio. Urna arcu integer purus at et quisque
                augue ipsum eget.
              </p>
              <p className="mb-4 text-[18px]/[26px]">
                Et elit magna eu felis eu adipiscing sed viverra amet. Arcu
                lorem facilisi lobortis ullamcorper congue massa risus. Lacus
                massa faucibus pharetra nibh. Gravida magna placerat fames a sit
                et accumsan nibh.
              </p>
              <p className="text-[18px]/[26px]">
                Arcu lorem facilisi lobortis ullamcorper congue massa risus.
                Lacus massa faucibus pharetra nibh. Gravida magna placerat fames
                a sit et accumsan nibh.
              </p>
            </div>
          </div>

          <div className="flex gap-14 justify-between mb-14">
            <div className="text-black text-left text-[18px]/[26px] max-w-[532px]">
              <h5 className="text-[28px]/[33px] font-medium mb-4">
                Our mission
              </h5>
              <p className="mb-4">
                Lorem ipsum dolor sit amet consectetur. Vehicula justo enim
                massa morbi lectus odio. Urna arcu integer purus at et quisque
                augue ipsum eget.
              </p>
              <p className="mb-4">
                Et elit magna eu felis eu adipiscing sed viverra amet. Arcu
                lorem facilisi lobortis ullamcorper congue massa risus. Lacus
                massa faucibus pharetra nibh. Gravida magna placerat fames a sit
                et accumsan nibh.
              </p>
              <ul className="pl-2 list-disc ml-4">
                <li>Arcu lorem facilisi lobortis ullamcorper congue massa.</li>
                <li>Facilisi lobortis ullamcorper congue.</li>
              </ul>
            </div>

            <ChartsComponent />
          </div>

          <button className="bg-primaryOrange w-[343px] mx-auto rounded-md text-white text-center pt-[10px] pb-[10px] hover:opacity-90 cursor-pointer font-medium mb-[104px]">
            GET A FREE QUOTATION
          </button>

          <GoogleRatingBunner />

          <div className="flex justify-between gap-[43px] mt-10">
            <Review />
            <Review />
            <Review />
          </div>

          <div className="mt-[112px]">
            <div className="text-[48px]/[57px] mb-8 text-black text-left">
              <div className="bg-[#FEF1DF] font-light p-1 rounded-sm inline-block">
                <span>Awarded</span>
              </div>{" "}
              <i className="font-normal">by:</i>
            </div>
            <div className="flex justify-between gap-[43px]">
              <AchiveBlock />
              <AchiveBlock />
              <AchiveBlock />
            </div>
          </div>
        </div>
      </section>
    </LoyaltAllWrapper>
  );
};
export default Partner;
