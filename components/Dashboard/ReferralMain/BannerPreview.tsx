"use client";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { Eye } from "lucide-react";

const BannerPreview = ({ image }: { image: string }) => {
  return (
    <Dialog>
      <DialogContent className="p-4">
        <Image
          className="w-full"
          width={100}
          height={100}
          src={`${process.env.NEXT_PUBLIC_BASE_URL}${image}`}
          alt="preview"
        />
      </DialogContent>
      <DialogTrigger asChild>
        <button title="Preview">
          <Eye size={30} />
        </button>
      </DialogTrigger>
    </Dialog>
  );
};

export default BannerPreview;
