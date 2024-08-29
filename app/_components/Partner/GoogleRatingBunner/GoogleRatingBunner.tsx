import Image from "next/image";
import GoogleRatingSvg from "@/assets/Partners/google-rating.svg";
import { Stars } from "../Stars/Stars";
import Link from "next/link";
import { PlaceDetails } from "@/components/PartnersDataPage/types";

export const GoogleRatingBunner = ({
  placeInfo,
}: {
  placeInfo: PlaceDetails;
}) => {
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
            {placeInfo.result?.rating}
          </div>
          <Stars value={Math.round(placeInfo.result?.rating)} />
          <div className="ml-4 opacity-50 text-[#00263E] text-[16px]/[24px] mt-[2px]">
            {placeInfo.result?.user_ratings_total} reviews
          </div>
        </div>
      </div>
      <Link href={placeInfo.result?.url} target="_blank">
        <button className="min-w-[205px] border-2 border-primaryOrange rounded-md text-primaryOrange font-medium bg-white py-3 transition-all hover:bg-primaryOrange hover:text-white">
          Write comment
        </button>
      </Link>
    </div>
  );
};
