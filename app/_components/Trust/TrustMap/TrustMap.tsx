import React from "react";
import Image from "next/image";

import map from "@/assets/map.svg";

const TrustMap = () => {
  return (
    <section className="w-full flex flex-col items-center gap-[40px] py-[104px] px-[72px]">
      <h1 className="text-black text-center font-light text-[40px]/[48px] flex">
        The best route.{" "}
        <div className="font-normal italic bg-[#FEF1DF] rounded-[6px] h-[49px] px-[8px] ml-2 flex justify-center items-center">
          Always
        </div>
      </h1>
      <Image className="w-full" src={map} alt={"map"} />
      <p className="text-black text-center px-[180px] font-normal text-[18px]/[25px]">
        {`With GOODS2LOAD, the world is your oyster. Our commitment to providing
        comprehensive coverage across global routes means that your ideas are
        never constrained by geographic limitations. Whether you're envisioning
        expansion into new markets, sourcing materials from distant suppliers,
        or delivering goods to customers across continents, our platform
        empowers you to dream big and reach far. With GOODS2LOAD, you have the
        freedom to explore endless possibilities and unlock the full potential
        of your business, knowing that we have you covered every step of the
        way.`}
      </p>
    </section>
  );
};

export default TrustMap;
