import GoogleIcon from "@/assets/Partners/google-icon.svg";
import GoogleCheck from "@/assets/Partners/google-check.svg";
import User1Img from "@/assets/Partners/user-1.png";
import Image from "next/image";
import { Stars } from "../Stars/Stars";

export const Review = () => {
  return (
    <div className="w-[382px] bg-[#FEF1DF] rounded-md p-6">
      <div className="flex gap-4 mb-[12px]">
        <div className="relative max-w-max">
          <Image
            className="rounded-full"
            src={User1Img}
            width={55}
            height={55}
            alt="user-avatar"
          />
          <Image
            className="rounded-full absolute right-0 bottom-0"
            src={GoogleIcon}
            width={22}
            height={22}
            alt="user-avatar"
          />
        </div>

        <div className="pt-1">
          <div className="flex text-[20px]/[22px] font-medium text-black">
            Name Surname
            <Image
              className="ml-1 mt-[6px]"
              width={14}
              height={14}
              src={GoogleCheck}
              alt="goocle-check"
            />
          </div>

          <div className="text-[16px]/[18px] text-black mt-2 text-left opacity-50">
            2 months ago
          </div>
        </div>
      </div>

      <Stars width={18} height={18} value={5} />

      <div className="max-w-[330px] mt-2 text-left text-black opacity-80">
        Lorem ipsum dolor sit amet consectetur. Tincidunt amet eu eget cursus
        nisl imperdiet ut aliquet tincidunt. Enim non purus in viverra tristique
        faucibus laoreet mauris ultrices. Montes iaculis non mi velit nibh
        ornare cras.
      </div>
    </div>
  );
};
