"use client";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Eye } from "lucide-react";

const BannerPreview = ({
  bigBanner,
  smallBanner,
}: {
  bigBanner: string;
  smallBanner: string;
}) => {
  return (
    <Dialog>
      <DialogContent className="p-4">
        <h3>Large banner:</h3>
        <div className="relative w-full h-[150px]">
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_URL}${bigBanner}`}
            layout="fill"
            objectFit="contain"
            unoptimized
            alt="preview"
          />
        </div>

        <h3>Small banner:</h3>
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_URL}${smallBanner}`}
          className="w-1/2"
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
