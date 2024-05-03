import React from "react";

import type { CompanyLeaderShipCard } from "@/app/interfaces/leaderShip/interface";

const CompanyLeaderShipCard = ({ pesonalInfo }: CompanyLeaderShipCard) => {
  return (
    <div className="flex flex-col items-center gap-[8px]">
      <h3 className="w-fit text-black text-[25px]/[22px] font-medium">
        {pesonalInfo?.name}
      </h3>
      <p className="max-w-[220px] text-center text-black text-[18px]/[23.4px] font-normal">
        {pesonalInfo?.position}
      </p>
    </div>
  );
};

export default CompanyLeaderShipCard;
