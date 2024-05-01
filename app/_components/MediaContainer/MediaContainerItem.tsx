import React, { FC } from "react";
import { IMedia } from "@/app/_components/MediaContainer/MediaContainer";
import Image from "next/image";

type TMedia = {
  item: IMedia;
};

const MediaContainerItem: FC<any> = ({ item }) => {
  return (
    <div
      key={item.date}
      className="w-[500px] h-[400px] rounded-lg flex-shrink-0 mt-[30px]"
    >
      <Image
        src={item.img}
        alt={item.title}
        width={500}
        height={200}
        className="rounded-t-lg mb-[30px]"
      />
      <div className="flex flex-row justify-between items-center text-black">
        <a
          className="text-[28px]/[33.6px] font-medium underline underline-offset-2 decoration-[1.5px] hover:cursor-pointer"
          href={item.link}
          target="_blank"
        >
          {item.title}
        </a>
        <h4 className="text-[20px]/[26px] font-normal">{item.date}</h4>
      </div>
    </div>
  );
};

export default MediaContainerItem;
