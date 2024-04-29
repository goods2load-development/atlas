"use client";
import React, { FC, useEffect, useState } from "react";
import Image from "next/image";

import { createPortal } from "react-dom";

import {
  ModalCareer,
  SalesChallenge,
} from "@/app/interfaces/leaderShip/interface";

import close from "@/assets/close.svg";

const CareerCard: React.FC<ModalCareer> = ({ pesonalInfo }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  function openModal() {
    setShowModal(!showModal);
  }
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }

    return () => {};
  }, [showModal]);
  return (
    <div className="card w-full max-w-[405px] flex flex-col justify-center items-center h-[229px] bg-lightOrange pt-[40px] rounded-[16px] pr-[40px] pl-[40px] pb-[40px] text-center mb-[50px]">
      <div className="flex flex-col h-full">
        <h2 className="text-primaryOrange text-[26px]  w-[350px] leading-[31.2px]">
          {pesonalInfo.challengeName}
        </h2>
        <p className="text-black text-[18px] leading-[31.2px] mb-[30px]">
          {pesonalInfo.workingName}
        </p>
        <button
          onClick={() => openModal()}
          className="bg-primaryOrange w-full max-w-[201px] mx-auto rounded-[16px] text-white text-center pt-[10px] pb-[10px]"
        >
          Read more
        </button>
      </div>
      {showModal &&
        createPortal(
          <Popup
            onClose={() => setShowModal(false)}
            leader={{ ...pesonalInfo }}
          />,
          document.body,
        )}
    </div>
  );
};

export default CareerCard;

type IPopup = {
  onClose: () => void;
  leader: SalesChallenge;
};

const Popup: FC<IPopup> = ({ onClose, leader }) => {
  const [index, setIndex] = useState<number>(0);
  function onClick(index: number) {
    setIndex(index);
  }

  return (
    <div className="w-full fixed inset-0 bg-[rgba(0,0,0,0.2)] flex flex-col justify-center items-center pb-[50px] pt-[40px]">
      <div className="max-w-[1000px] max-h-[800px] w-fit p-10 flex flex-col rounded-[32px] bg-white relative ">
        <h1 className="text-primaryOrange font-light   items-center gap-[8px] mb-[10px]">
          <span className="font-normal text-[28px]">{leader.modalName}</span>{" "}
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
            ),
          )}
        </div>

        <Image
          className="absolute top-10 right-10 hover:cursor-pointer"
          src={close}
          alt={"close"}
          onClick={onClose}
        />
      </div>
    </div>
  );
};
