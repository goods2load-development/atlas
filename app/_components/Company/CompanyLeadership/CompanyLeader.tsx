import React, { FC, useState } from "react";
import { ILeader } from "@/app/_components/Company/CompanyLeadership/CompanyLeadership";
import Image from "next/image";
import arrow from "@/assets/arrow.svg";
import linkedin from "@/assets/linkedin.svg";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import close from "@/assets/close.svg";
import { Leadership } from "@/app/interface/leaderShip";

type TItem = {
  item: Leadership;
};

const CompanyLeader: FC<TItem> = ({ item }) => {
  return (
    <div className="lg:w-[243px] mt-8 sm:mt-0">
      <Dialog>
        <div className="lg:w-full relative w-[163px] h-[163px] sm:h-fit lg:max-h-[280px] max-h-[200px] mx-auto mb-[18px] sm:mb-0">
          <Image src={item.img} alt={item.name} className="rounded-full" />
          <DialogTrigger asChild className="relative">
            <Button className="flex bg-primaryOrange sm:w-[64px] sm:h-[64px] w-[56px] h-[56px] justify-center items-center rounded-full right-0 hover:cursor-pointer transform translate-x-[110px] translate-y-[-55px] lg:translate-x-[190px] lg:translate-y-[-100px]">
              <Image src={arrow} alt={"arrow"} />
            </Button>
          </DialogTrigger>
        </div>
        <div className="flex flex-col items-center gap-[8px]">
          <h3 className="max-w-[143px] sm:max-w-full w-fit text-black text-[20px]/[24px] sm:text-[25px]/[22px] font-medium">
            {item.name}
          </h3>
          <p className="max-w-[143px] sm:max-w-[220px] text-center text-black sm:text-[18px]/[23.4px] text-[15px]/[19px] font-normal">
            {item.position}
          </p>
        </div>

        <DialogContent className="max-w-[360px] sm:max-w-[800px] w-full sm:w-fit bg-white">
          <DialogHeader className="rounded-[32px]">
            <div className="max-w-[360px] sm:max-w-[800px] w-fit flex flex-col rounded-[32px] bg-white modal">
              <h1 className="text-black font-light sm:text-[30px]/[34px] lg:text-[48px]/[57.6px] flex flex-row items-center gap-[8px] text-center">
                {" "}
                <Image src={linkedin} alt={"linkedin"} />
                {item.name.split(" ")[0]}{" "}
                <span className="font-normal sm:text-[30px]/[34px] lg:text-[48px]/[57.6px] italic">
                  {item.name.split(" ")[1]}
                </span>{" "}
              </h1>
              <p className="text-primaryOrange sm:text-[18px]/[23.4px] font-normal pb-6">
                {item.position}
              </p>
              <p className="text-black text-[14px]/[16px] sm:text-[18px]/[24px] font-normal max-w-[320px] sm:max-w-[auto]">
                {item.info}
              </p>
            </div>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild className="hidden">
              <Button
                type="button"
                className="top-[5%] absolute right-[3%] bg-white"
              >
                <Image
                  className="right-10 hover:cursor-pointer"
                  src={close}
                  alt={"close"}
                />
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CompanyLeader;
