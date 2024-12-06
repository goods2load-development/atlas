import DefaultImage from '@/assets/images/default-image.jpg';
import { slugify } from '@/lib/utils';

import Image from 'next/image';
import Link from 'next/link';

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
    : DefaultImage;

  return (
    <header
      className="relative h-80 md:h-[350px] overflow-hidden"
      aria-labelledby="article-title"
    >
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          quality={65}
          fill
          sizes="100vw"
          className="object-cover"
          priority
          alt={`Featured image for ${title}`}
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 p-8 h-full flex flex-col justify-center lg:w-full lg:max-w-[1328px] lg:mx-auto">
        <div className="flex items-center mb-4">
          <Link
            href={`/category/${slugify(category)}`}
            className="mb-2 bg-orange-500 text-white px-2 py-1 text-xs font-bold uppercase rounded-lg"
            aria-label={`View all articles in ${category}`}
          >
            {category}
          </Link>
        </div>

        <h1 id="article-title" className="text-3xl md:text-4xl text-white mb-4">
          {title}
        </h1>

        <div
          className="flex items-center text-white gap-3 lg:gap-40"
          aria-label="Article metadata"
        >
          <time
            dateTime={new Date(publishDate).toISOString()}
            className="text-sm"
          >
            {publishDate}
          </time>
          <p className="text-sm">{readingTime} min read</p>
        </div>

        <address
          className="text-primaryOrange not-italic"
          aria-label={`Author: ${authorName}`}
        >
          {authorName}
        </address>
      </div>
    </header>
  );
};

export default HeaderImage;
