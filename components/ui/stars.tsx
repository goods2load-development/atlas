import { useEffect, useState } from 'react';

export const Stars = ({
  value,
  width = 24,
  height = 24,
}: {
  value: number;
  width?: number;
  height?: number;
}) => {
  const [stars, setStars] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const fullStarsCount = Math.floor(value);
    const hasHalfStar = value % 1 >= 0.2;

    const fullStarSVG = (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="gold"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 2L14.09 8.26L21 9.27L16 14.14L17.18 21.02L12 17.77L6.82 21.02L8 14.14L3 9.27L9.91 8.26L12 2Z" />
      </svg>
    );

    const halfStarSVG = (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="halfGradient">
            <stop offset="50%" stopColor="gold" />
            <stop offset="50%" stopColor="#CBD5E1" />
          </linearGradient>
        </defs>
        <path
          d="M12 2L14.09 8.26L21 9.27L16 14.14L17.18 21.02L12 17.77L6.82 21.02L8 14.14L3 9.27L9.91 8.26L12 2Z"
          fill="url(#halfGradient)"
        />
      </svg>
    );

    const emptyStarSVG = (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="#CBD5E1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 2L14.09 8.26L21 9.27L16 14.14L17.18 21.02L12 17.77L6.82 21.02L8 14.14L3 9.27L9.91 8.26L12 2Z" />
      </svg>
    );

    const newStars = Array.from({ length: 5 }, (_, idx) => (
      <span key={idx}>
        {idx < fullStarsCount
          ? fullStarSVG
          : idx === fullStarsCount && hasHalfStar
            ? halfStarSVG
            : emptyStarSVG}
      </span>
    ));

    setStars(newStars);
  }, [value, width, height]);

  return <div className="flex">{stars}</div>;
};
