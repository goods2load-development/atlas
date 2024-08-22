import Image from "next/image";
import GoogleRatingSvg from "@/assets/Partners/google-rating.svg";
import { Stars } from "../Stars/Stars";

export const GoogleRatingBunner = () => {
  return (
    <div className="rounded-md bg-[#FEF1DF] p-6 flex justify-between items-center">
      <div>
        <Image
          width={195}
          height={37}
          src={GoogleRatingSvg}
          alt="Google rating"
        />
        <div className="flex items-center mt-2">
          <div className="text-[20px]/[26px] font-extrabold text-[#00263E] mr-1 opacity-80">
            4.9
          </div>
          <Stars value={4} />
          <div className="ml-4 opacity-50 text-[#00263E] text-[16px]/[24px] mt-[2px]">
            95 reviews
          </div>
        </div>
      </div>
      <button className="min-w-[205px] border-2 border-primaryOrange rounded-md text-primaryOrange font-medium bg-white py-3 transition-all hover:bg-primaryOrange hover:text-white">
        Write comment
      </button>
    </div>
  );
};
