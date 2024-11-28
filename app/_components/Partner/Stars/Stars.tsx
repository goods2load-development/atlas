import StarSvgNone from '@/assets/icons/star-none.svg';
import StarSvg from '@/assets/icons/star.svg';

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
    const newStars = new Array(5)
      .fill(null)
      .map((_, idx) => (
        <Image
          className="text-gra"
          key={idx}
          width={width || 22}
          height={height || 22}
          src={value > idx ? StarSvg : StarSvgNone}
          alt="star"
        />
      ));
    setStars(newStars);
  }, [value]);

  return <div className="flex">{stars}</div>;
};
