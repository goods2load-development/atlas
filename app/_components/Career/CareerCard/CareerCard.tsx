import React from "react";

interface CareerCard {
  pesonalInfo: {
    challengeName: string;
    workingName: string;
  };
}

const CareerCard: React.FC<CareerCard> = ({ pesonalInfo }) => {
  return (
    <div className="card w-full max-w-[405px] flex flex-col justify-center items-center h-[229px] bg-lightOrange pt-[40px] rounded-[16px] pr-[40px] pl-[40px] pb-[40px] text-center mb-[50px]">
      <div className="flex flex-col h-full">
        <h2 className="text-primaryOrange font-poppins text-[26px]  w-[350px] italic font-bold leading-[31.2px]">
          {pesonalInfo.challengeName}
        </h2>
        <p className="text-black font-poppins text-[18px] italic font-bold leading-[31.2px] mb-[30px]">
          {pesonalInfo.workingName}
        </p>
        <button className="bg-primaryOrange w-full max-w-[201px] mx-auto rounded-[16px] text-center pt-[10px] pb-[10px]">
          Read more
        </button>
      </div>
    </div>
  );
};

export default CareerCard;
