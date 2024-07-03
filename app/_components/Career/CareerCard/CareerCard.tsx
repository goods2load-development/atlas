"use client";
import React, { FC, useEffect, useState } from "react";
import Image from "next/image";

import { createPortal } from "react-dom";

import {
  ModalCareer,
  SalesChallenge,
} from "@/app/interfaces/leaderShip/interface";

import close from "@/assets/close.svg";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

const CareerCard: React.FC<ModalCareer> = ({ pesonalInfo }) => {
  return (
    <Dialog>
      <div className="card w-full max-w-[405px] flex flex-col justify-center items-center h-[229px] bg-lightOrange sm:p-10 p-6 rounded-[16px] text-center sm:mb-[50px]">
        <div className="flex flex-col sm:h-full">
          <h2 className="text-primaryOrange  text-[24px] sm:text-[26px]  w-[350px] leading-[31.2px]">
            {pesonalInfo.challengeName}
          </h2>
          <p className="text-black sm:text-[18px] leading-[31.2px] mb-[30px]">
            {pesonalInfo.workingName}
          </p>
          <DialogTrigger asChild>
            <button className="bg-primaryOrange w-full max-w-[201px] mx-auto rounded-[16px] text-white text-center pt-[10px] pb-[10px]">
              Read more
            </button>
          </DialogTrigger>
        </div>
        <Popup leader={{ ...pesonalInfo }} />
      </div>
    </Dialog>
  );
};

export default CareerCard;

type IPopup = {
  leader: SalesChallenge;
};

const Popup: FC<IPopup> = ({ leader }) => {
  const [index, setIndex] = useState<number>(0);
  function onClick(index: number) {
    setIndex(index);
  }

  return (
    <DialogContent className="max-w-[1025px] sm:h-[620px] h-[100%] text-transparent">
      <div className="w-full fixed h-full inset-0 bg-[rgba(0,0,0,0.2)] flex flex-col justify-center items-center rounded-[32px]">
        <div className="z-10 max-w-[1035px] h-[100%] sm:h-[750px] overflow-y-scroll sm:max-h-[800px] w-fit p-10 flex flex-col sm:rounded-[32px] bg-white relative text-black">
          <h1 className="text-primaryOrange font-light  items-center gap-[8px] mb-[10px]">
            <span className="font-normal text-[20px] sm:text-[28px]">
              {leader.modalName}
            </span>{" "}
          </h1>
          <p className="mb-[20px]">{leader.description}</p>
          <div className="w-fit max-w-[800px] justify-center">
            <div className="flex mb-[20px] gap-[30px]">
              {leader.options.map((it: { optionName: string }, i: number) => {
                return (
                  <div
                    className="cursor-pointer  text-[18px]"
                    key={i}
                    onClick={() => onClick(i)}
                  >
                    <div
                      className={`${index === i ? "text-primaryOrange" : "text-careerModalGrey"} w-full max-w-[961px] mb-[10px]`}
                    >
                      {it.optionName}
                    </div>
                    <div
                      className={`${index === i ? `allDecorationUnderLink  h-[2px]` : "hidden"}`}
                    ></div>
                  </div>
                );
              })}
            </div>
            {leader.options.map(
              (it: { optionText: string; additionText: string }, i: number) => (
                <div key={i}>
                  <div
                    className={`${index === i ? "" : "hidden"} font-normal text-[16px] leading-[24px] mb-[20px]`}
                  >
                    <p>
                      {it.optionText
                        .split("\n")
                        .map((line: string, index: number) => (
                          <span key={index}>
                            {line}
                            <br />
                          </span>
                        ))}
                    </p>
                  </div>
                  <div
                    className={`${index === i ? "" : "hidden"} font-normal text-[16px] leading-[24px] mb-[20px]`}
                  >
                    {it.additionText}
                  </div>
                </div>
              )
            )}
          </div>
          <DialogClose asChild>
            <Image
              className="absolute top-10 right-10 hover:cursor-pointer"
              src={close}
              alt={"close"}
            />
          </DialogClose>
        </div>
      </div>
    </DialogContent>
  );
};
