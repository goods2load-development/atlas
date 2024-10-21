import StarSvg from '@/assets/star.svg';

import { useEffect, useState } from 'react';

import Image from 'next/image';

export const Stars = ({
  value,
  width,
  height,
}: {
  value: number;
  width?: number;
  height?: number;
}) => {
  const [stars, setStars] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const newStars = new Array(value)
      .fill(null)
      .map((_, idx) => (
        <Image
          className=""
          key={idx}
          width={width || 22}
          height={height || 22}
          src={StarSvg}
          alt="star"
        />
      ));
    setStars(newStars);
  }, [value]);

  return <div className="flex">{stars}</div>;
};
