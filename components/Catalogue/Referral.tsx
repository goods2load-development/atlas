import { useEffect } from "react";
import { useReferralsStore } from "@/lib/store";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

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
      <div className="rounded-2xl overflow-hidden relative w-full mb-6">
        <Link
          target="_blank"
          className="absolute inset-0"
          href={referals[0]?.url}
        ></Link>
        <Image
          className="w-full"
          width={100}
          height={100}
          src={`${process.env.NEXT_PUBLIC_BASE_URL}${referals[0]?.smallBanner}`}
          unoptimized
          alt="preview"
        />
      </div>
      <div className="rounded-2xl overflow-hidden relative w-full">
        <Link
          target="_blank"
          className="absolute inset-0"
          href={referals[0]?.url}
        ></Link>
        <Image
          className="w-full"
          width={100}
          height={100}
          src={`${process.env.NEXT_PUBLIC_BASE_URL}${referals[1]?.smallBanner}`}
          unoptimized
          alt="preview"
        />
      </div>
    </div>
  );
};
