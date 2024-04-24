import React, { FC, useState } from "react";
import Image from "next/image";

import { createPortal } from "react-dom";

import CompanyLeaderShipCard from "../CompanyLeaderShipCard/CompanyLeaderShipCard";
import {
  CompanyLeader,
  Leadership,
} from "@/app/interfaces/leaderShip/interface";

import linkedin from "@/assets/linkedin.svg";
import arrow from "@/assets/arrow.svg";
import close from "@/assets/close.svg";

const CompanyLeader: FC<CompanyLeader> = ({ item }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  function openModal() {
    setShowModal(!showModal);
  }
  return (
    <div className="w-full">
      <div className="w-full relative w-fit h-fit mb-[18px]">
        <Image src={item.img} alt={item.name} className="rounded-full" />
        <div
          className="bg-primaryOrange w-[64px] h-[64px] flex justify-center items-center rounded-full absolute bottom-0 right-[15%] hover:cursor-pointer"
          onClick={() => {
            openModal();
          }}
        >
          <Image src={arrow} alt={"arrow"} />
        </div>
      </div>
      <CompanyLeaderShipCard pesonalInfo={item} />
      {showModal &&
        createPortal(
          <Popup onClose={() => setShowModal(false)} leader={{ ...item }} />,
          document.body,
        )}
    </div>
  );
};

export default CompanyLeader;

type IPopup = {
  onClose: () => void;
  leader: Leadership;
};

const Popup: FC<IPopup> = ({ onClose, leader }) => {
  return (
    <div className="w-full h-full fixed inset-0 bg-[rgba(0,0,0,0.2)] flex flex-col justify-center items-center">
      <div className="max-w-[800px] w-fit p-10 flex flex-col rounded-[32px] bg-white relative">
        <h1 className="text-black font-light text-[48px]/[57.6px] flex flex-row items-center gap-[8px]">
          {" "}
          <Image src={linkedin} alt={"linkedin"} />
          {leader.name.split(" ")[0]}{" "}
          <span className="font-normal text-[48px]/[57.6px] italic">
            {leader.name.split(" ")[1]}
          </span>{" "}
        </h1>
        <p className="text-primaryOrange text-[18px]/[23.4px] font-normal pb-6">
          {leader.position}
        </p>
        <pre className="text-black font-poppins text-[18px]/[24px] font-normal">
          {leader.info}
        </pre>
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
