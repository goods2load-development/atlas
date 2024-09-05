import React from 'react';
import Image from 'next/image';

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
  // Use a default image URL if the provided URL is invalid
  const imageUrl = mainImageUrl || '/default-image.jpg'; // Ensure you have a default image in the public directory

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

      <div className="relative z-10 p-8 h-full flex flex-col justify-center">
        <div className="flex items-center mb-4">
          <span className="bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {category}
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h1>
        <div className="flex items-center text-white">
          <p className="text-sm">{publishDate} | {readingTime} min read</p>
        </div>
      </div>
    </div>
  );
};

export default HeaderImage;
