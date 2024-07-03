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
    imageSrc: "/logisticimg1.png",
    date: "February 2024",
    text: "With 30% of global container trade transiting through the Suez Canal, the Red Sea shipping crisis is upending supply chains.",
    link: "https://www.jpmorgan.com/insights/global-research/supply-chain/red-sea-shipping",
  },
  {
    title: "Kuehne & Nagel International",
    imageSrc: "/logisticimg2.png",
    date: "February 2024",
    text: "Kühne + Nagel International AG engages in the provision of logistic services. It operates through the following segments: Sea Freight, Airfreight, Overland, and Contract Logistics.",
    link: "https://www.forbes.com/companies/kuehne-nagel-international/?sh=4263844f5141",
  },
  {
    title: "CNBC",
    imageSrc: "/logisticimg3.png",
    date: "February 2024",
    text: "Ocean freight rates from Asia to the U.S. have begun to de- cline, providing some relief for U.S. shippers. But cargo shipping costs are still massively up since Decem",
    link: "https://www.cnbc.com/2024/02/15/red-sea-attack-fueled-ocean-freight-inflation-is-starting-to-reverse.html#:~:text=State%20of%20Freight-,Red%20Sea%20attack%2Dfueled%20ocean%20freight%20inflation%20is%20starting%20to,on%20key%20global%20trade%20routes&text=Ocean%20freight%20rates%20from%20Asia,the%20Red%20Sea%20crisis%20began.",
  },
];

function LogisticsItem({ item }: { item: lItemProps }) {
  return (
    <div className="sm:w-4/12 mb-5 sm:pr-[20px] sm:min-w-[400px]">
      <div className="bg-gradient-to-br from-gradFrom to-gradTo px-[30px] py-[20px] rounded-sm mb-[30px]">
        <img
          src={item.imageSrc}
          alt={item.title}
          className="shadow-lg w-full"
        />
      </div>
      <div className="text-[24px]/[28px] font-medium mb-[10px]">
        {item.title}
      </div>
      <div className="text-[16px]/[20px] font-light sm:mb-[10px] mb-[16px]">
        {item.date}
      </div>
      <div className="text-[16px]/[22px] mb-[10px] font-normal">
        {item.text}
      </div>
      <Link href={item.link} className="text-orangePrimary text-[18px]/[22px]">
        Read more
        <img src="/arrowlong.png" className="inline-block ml-3" />
      </Link>
    </div>
  );
}

export default function LogisticInsights() {
  return (
    <div className="px-5 sm:px-16 py-[80px] bg-bgLogistics bg-cover bg-center">
      <h2 className="font-light text-[30px]/[34px] sm:text-[40px]/[48px] text-center sm:text-left">
        <i className="bg-orangeSecondary rounded-sm px-2 font-normal">
          Logistics
        </i>{" "}
        insights:
      </h2>
      <div className="font-light text-[16px]/[20px] sm:text-[18px]/[22px] py-3 text-center sm:text-left">
        stay ahead with our blog.
      </div>
      <div className="sm:flex flex-wrap justify-center space-between mt-5">
        {lItems.map((item, index) => (
          <LogisticsItem item={item} key={`${item.title}-${index}`} />
        ))}
      </div>
    </div>
  );
}
