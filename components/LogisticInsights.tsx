import Image from "next/image";
import Link from "next/link";

interface lItemProps {
  title: string;
  imageSrc: string;
  date: string;
  text: string;
  link: string;
}

// TEMP DATA (till missing API)
const lItems: lItemProps[] = [
  {
    title: "JP MORGAN",
    imageSrc: "/temp1.png",
    date: "February 2024",
    text: "With 30% of global container trade transiting through the Suez Canal, the Red Sea shipping crisis is upending supply chains.",
    link: "",
  },
  {
    title: "JP MORGAN",
    imageSrc: "/temp1.png",
    date: "February 2024",
    text: "With 30% of global container trade transiting through the Suez Canal, the Red Sea shipping crisis is upending supply chains.",
    link: "/",
  },
  {
    title: "JP MORGAN",
    imageSrc: "/temp1.png",
    date: "February 2024",
    text: "With 30% of global container trade transiting through the Suez Canal, the Red Sea shipping crisis is upending supply chains.",
    link: "/",
  },
];

function LogisticsItem({ item }: { item: lItemProps }) {
  return (
    <div className="w-4/12 pr-[20px]">
      <div className="bg-gradient-to-br from-gradFrom to-gradTo px-[30px] py-[20px] rounded-sm">
        <img src={item.imageSrc} alt={item.title} className="shadow-lg" />
      </div>
      <div className="">{item.title}</div>
      <div className="">{item.date}</div>
      <div className="text-[16px]/[22px]">{item.text}</div>
      <Link href={item.link} className="text-orangePrimary text-[18px]/[22px]">
        Read more
      </Link>
    </div>
  );
}

export default function LogisticInsights() {
  return (
    <div className="px-16 py-[60px] bg-bgLogistics bg-cover bg-center">
      <h2 className="font-light text-[40px]/[48px]">
        <i className="bg-orangeSecondary">Logistics</i> insights:
      </h2>
      <div className="font-light text-[18px]/[22px] py-[20px]">
        stay ahead with our blog.
      </div>
      <div className="flex space-beetwen">
        {lItems.map((item, index) => (
          <LogisticsItem item={item} key={`${item.title}-${index}`} />
        ))}
      </div>
    </div>
  );
}
