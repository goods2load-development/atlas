"use client";

import React, { FC, useState } from "react";
import { IBlock } from "@/app/_components/Company/CompanyStory/CompanyStory";
import Image from "next/image";

type TItem = {
  item: IBlock;
};

const CompanyStoryBlock: FC<TItem> = ({ item }) => {
  const [showMore, setShowMore] = useState<boolean>(false);

  return (
    <div className="max-w-[294px] flex flex-col gap-[24px]">
      <div className="bg-primaryOrange w-[96px] h-[96px] flex justify-center items-center rounded-full border-2 border-white border-solid	outline-2	outline-[#FF6720] outline mx-auto sm:ml-0">
        <Image src={item.icon} alt={"icon"} width={50} height={50} />
      </div>

      <div className="flex flex-col text-black">
        <h2 className="font-normal text-[26px]/[22px] italic pb-[16px] sm:text-left text-center">
          {item.time}
        </h2>
        {!item.more ? (
          <p className="font-normal text-[16px]/[22.4px] sm:text-left text-center">
            {item.info}
          </p>
        ) : (
          <p
            className={`font-normal text-[16px]/[22.4px] text-center sm:text-left ${!showMore && "max-h-[156px] text-story w-full"}`}
          >
            {item.info}
          </p>
        )}
        {item.more && (
          <p
            className="text-[#FF6720] text-[15px]/[18px] text-left font-medium underline underline-offset-1 decoration-[1.5px] pt-[4px] hover:cursor-pointer sm:text-left text-center"
            onClick={() => {
              setShowMore(!showMore);
            }}
          >
            {!showMore ? "Learn more" : "Hide"}
          </p>
        )}
      </div>
    </div>
  );
};

export default CompanyStoryBlock;
