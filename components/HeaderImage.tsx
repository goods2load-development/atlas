import React from "react";
import Image from "next/image";
import { formatDate } from "@/lib/utils";

interface HeaderImageProps {
  title: string;
  mainImageUrl: string;
  category: string;
  authorName: string;
  readingTime: number;
  publishDate: string;
}

const HeaderImage: React.FC<HeaderImageProps> = ({
  title,
  mainImageUrl,
  category,
  authorName,
  readingTime,
  publishDate,
}) => {
  const imageUrl = mainImageUrl
    ? `${process.env.NEXT_PUBLIC_BASE_URL}${mainImageUrl}`
    : "/default-image.jpg";

  return (
    <div className="relative h-80 md:h-[350px] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
      </div>

      <div className="relative z-10 p-8 h-full flex flex-col justify-center lg:max-w-[420px] lg:w-full">
        <div className="flex items-center mb-4">
          <span className="bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {category}
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl text-white mb-4">{title}</h1>
        <div className="flex items-center text-white lg:justify-between gap-3">
          <p className="text-sm">{publishDate}</p>
          <p className="text-sm">{readingTime} min read</p>
        </div>
        <div className="text-primaryOrange">{authorName}</div>
      </div>
    </div>
  );
};

export default HeaderImage;
