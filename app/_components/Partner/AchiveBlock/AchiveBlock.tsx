import Image from "next/image";
import AchiveImg from "@/assets/Partners/achive.svg";
import PartnerLogo from "@/assets/Partners/partner-logo.svg";

export const AchiveBlock = () => {
  return (
    <div className="text-black text-left w-[353px]">
      <Image
        className="mb-6"
        width={48}
        height={48}
        src={AchiveImg}
        alt="achive"
      />
      <div className="font-medium text-[28px]/[33px] mb-4">2011</div>
      <div className="font-medium text-[22px]/[33px] mb-4">Award Name</div>
      <div className="mb-6 text-[18px]/[26px]">
        Lorem ipsum dolor sit amet consectetur. Vehicula justo enim massa morbi
        lectus odio.
      </div>

      <Image
        className="mb-6"
        width={247}
        height={31}
        src={PartnerLogo}
        alt="Partner logo"
      />
    </div>
  );
};
