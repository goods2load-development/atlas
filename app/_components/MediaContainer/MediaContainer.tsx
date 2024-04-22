import React from 'react';
import { media } from '@/app/_components/MediaContainer/MediaData';
import MediaContainerItem from '@/app/_components/MediaContainer/MediaContainerItem';

export interface IMedia {
  img: String,
  title: string,
  date: string,
  link: string
}

const MediaContainer = () => {
  return (
    <div  className='w-full max-w-[1440px] grid gap-8 grid-cols-2 py-[104px]'>
      {media.map((item: IMedia)=> <MediaContainerItem key={item.date} item={item}/> )}
    </div>
  );
};

export default MediaContainer;
