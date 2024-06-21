import React from "react";
import { media } from "@/app/_components/MediaContainer/MediaData";
import MediaContainerItem from "@/app/_components/MediaContainer/MediaContainerItem";
import { StaticImageData } from "next/image";

export interface IMedia {
  img: StaticImageData;
  title: string;
  date: string;
  link: string;
}

const MediaContainer = () => {
  return (
    <div className="w-full sm:grid grid-cols-2 justify-center gap-8 top-[300px] pb-[104px] px-5 sm:px-[72px]">
      {media.map((item: any) => (
        <MediaContainerItem key={item.date} item={item} />
      ))}
    </div>
  );
};

export default MediaContainer;
