import React, { FC, useState } from 'react';
import { ILeader } from '@/app/_components/Company/CompanyLeadership/CompanyLeadership';
import Image from 'next/image';
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
import { Leadership } from '@/app/interface/leaderShip';

type TItem = {
  item: Leadership;
};

const CompanyLeader: FC<TItem> = ({ item }) => {
  return (
    <div className="w-full ">
      <Dialog>
        <div className="w-full relative w-fit h-fit max-h-[280px]">
          <Image src={item.img} alt={item.name} className="rounded-full" />
          <DialogTrigger asChild className="relative">
            <Button className="flex bg-primaryOrange w-[64px] h-[64px] flex justify-center items-center rounded-full right-0 hover:cursor-pointer transform translate-x-[190px] translate-y-[-100px]">
              <Image src={arrow} alt={"arrow"} />
            </Button>
          </DialogTrigger>
        </div>
        <div className="flex flex-col items-center gap-[8px]">
          <h3 className="w-fit text-black text-[25px]/[22px] font-medium">
            {item.name}
          </h3>
          <p className="max-w-[220px] text-center text-black text-[18px]/[23.4px] font-normal">
            {item.position}
          </p>
        </div>

        <DialogContent className="max-w-[800px] w-fit bg-white">
          <DialogHeader className="rounded-[32px]">
            <div className="max-w-[800px] w-fit flex flex-col rounded-[32px] bg-white modal">
              <h1 className="text-black font-light text-[48px]/[57.6px] flex flex-row items-center gap-[8px]">
                {" "}
                <Image src={linkedin} alt={"linkedin"} />
                {item.name.split(" ")[0]}{" "}
                <span className="font-normal text-[48px]/[57.6px] italic">
                  {item.name.split(" ")[1]}
                </span>{" "}
              </h1>
              <p className="text-primaryOrange text-[18px]/[23.4px] font-normal pb-6">
                {item.position}
              </p>
              <pre className="text-black text-[18px]/[24px] font-normal">
                {item.info}
              </pre>
            </div>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" className="top-[5%] absolute right-[3%] bg-white">
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
