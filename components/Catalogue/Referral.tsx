import { useEffect } from "react";
import { useReferralsStore } from "@/lib/store";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import refLogo from "@/assets/ref-logo.svg";
import longArrow from "@/assets/long-arrow.svg";

export const Referal = ({ className }: { className?: string }) => {
  const {
    getAllReferrals,
    referrals: { referals, referalIsInCatalog },
  } = useReferralsStore((state: any) => state);

  useEffect(() => {
    getAllReferrals();
  }, []);

  if (referals?.length === 0 || !referalIsInCatalog) {
    return;
  }

  return (
    <div className={clsx("min-h-[360px] w-[279px]", className)}>
      <div
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_URL}${referals[0]?.smallBanner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="rounded-2xl overflow-hidden relative w-full aspect-[1/1] py-6 px-4 text-white flex flex-col"
      >
        <Image width={42} height={42} src={refLogo} alt="R-logo" />
        <Link
          target="_blank"
          className="text-primaryOrange text-[18px]/[22px] font-medium flex justify-between mt-auto"
          href={referals[0]?.url}
        >
          Read more
          <Image width={100} height={5} src={longArrow} alt="arrow" />
        </Link>
      </div>
    </div>
  );
};
