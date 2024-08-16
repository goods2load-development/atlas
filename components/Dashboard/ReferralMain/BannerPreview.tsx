"use client";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Eye } from "lucide-react";

const BannerPreview = ({ image }: { image: string }) => {
  return (
    <Dialog>
      <DialogContent className="p-4">
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_URL}${image}`}
          className="w-full"
          quality={100}
          width={100}
          height={100}
          unoptimized
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
