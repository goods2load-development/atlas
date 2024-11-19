import { RelatedBlogs } from '../Blog/RelatedBlogs';
import MediaContainerItem from '@/app/_components/MediaContainer/MediaContainerItem';
import { media } from '@/app/_components/MediaContainer/MediaData';

import React from 'react';

import { StaticImageData } from 'next/image';

import LogisticInsights from '@/components/LogisticInsights';

export interface IMedia {
  img: StaticImageData;
  title: string;
  date: string;
  link: string;
}

const MediaContainer = () => {
  return (
    <div>
      <div className="w-full sm:grid grid-cols-2 justify-center gap-8 top-[300px] pb-[104px] px-[16px] max-w-[1328px] mx-auto">
        {media.map((item: any) => (
          <MediaContainerItem key={item.date} item={item} />
        ))}
      </div>
      <div className="pb-[104px]">
        <RelatedBlogs />
      </div>
    </div>
  );
};

export default MediaContainer;
