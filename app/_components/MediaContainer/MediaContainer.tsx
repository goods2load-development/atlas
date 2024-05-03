import React from 'react';
import { media } from '@/app/_components/MediaContainer/MediaData';
import MediaContainerItem from '@/app/_components/MediaContainer/MediaContainerItem';
import Image from "next/image";

export interface IMedia {
  img: string;
  title: string;
  date: string;
  link: string;
}

const MediaContainer = () => {
  return (
    <div className="w-full flex flex-col justify-center gap-8  top-[300px]">
      <div className="flex justify-center gap-8">
        {media.slice(0, 2).map((item: any) => (
          <MediaContainerItem key={item.date} item={item} />
        ))}
      </div>
      <div className="flex justify-center  gap-8">
        {media.slice(2).map((item: any) => (
          <MediaContainerItem key={item.date} item={item} />
        ))}
      </div>
    </div>
  );
};

export default MediaContainer;
