import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import fcIcon from "@/assets/fc.svg";
import sharedIcon from "@/assets/shared-icon.svg";
import xIcon from "@/assets/x-icon.svg";
import inIcon from "@/assets/in-icon.svg";
import { useToast } from "./ui/use-toast";

import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share";
import { usePathname } from "next/navigation";

const SharedLinks: React.FC = () => {
  const currentUrl = usePathname().slice(1);
  const { toast } = useToast();

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}${currentUrl}`
      );
      toast({
        title: "Link copied",
        variant: "default",
        className: "bg-green-500 text-white",
      });
    } catch (error) {
      console.error("Ошибка при копировании ссылки:", error);
    }
  };

  return (
    <div className="flex items-center justify-center gap-[14px]">
      <button
        onClick={handleShare}
        className="min-w-8 min-h-8 flex items-center justify-center rounded-full bg-primaryOrange hover:opacity-80 transition-opacity"
      >
        <Image src={sharedIcon} width={18} height={18} alt="Shared" />
      </button>
      <LinkedinShareButton
        title="Goods2load"
        summary="Blog"
        url={`${process.env.NEXT_PUBLIC_CLIENT_URL}${currentUrl}`}
      >
        <div className="min-w-8 min-h-8 flex items-center justify-center rounded-full bg-primaryOrange hover:opacity-80 transition-opacity">
          <Image src={inIcon} width={18} height={18} alt="LinkedIn" />
        </div>
      </LinkedinShareButton>
      <TwitterShareButton
        title="Goods2load"
        url={`${process.env.NEXT_PUBLIC_CLIENT_URL}${currentUrl}`}
      >
        <div className="min-w-8 min-h-8 flex items-center justify-center rounded-full bg-primaryOrange hover:opacity-80 transition-opacity">
          <Image src={xIcon} width={18} height={18} alt="X" />
        </div>
      </TwitterShareButton>
      <FacebookShareButton
        url={`${process.env.NEXT_PUBLIC_BASE_URL}${currentUrl}`}
      >
        <div className="min-w-8 min-h-8 flex items-center justify-center rounded-full bg-primaryOrange hover:opacity-80 transition-opacity">
          <Image src={fcIcon} width={18} height={18} alt="Facebook" />
        </div>
      </FacebookShareButton>
    </div>
  );
};

export default SharedLinks;
