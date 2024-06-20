import Image, { StaticImageData } from "next/image";

export default function LegacyBG({ src, width, height }: StaticImageData) {
  return (
    <Image
      priority
      src={src}
      width={width}
      height={height}
      alt="Legacy page bg"
      className="w-screen min-h-[216px] object-cover"
    />
  );
}
