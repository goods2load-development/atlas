import ArrowLong from '@/assets/icons/arrowlong.svg';
import LogisticsImg1 from '@/assets/images/logisticimg1.png';
import LogisticsImg2 from '@/assets/images/logisticimg2.png';
import LogisticsImg3 from '@/assets/images/logisticimg3.png';

import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

interface lItemProps {
  title: string;
  imageSrc: string | StaticImageData;
  date: string;
  text: string;
  link: string;
}

// TEMP DATA (till missing API)
const lItems: lItemProps[] = [
  {
    title: 'JP MORGAN',
    imageSrc: LogisticsImg1,
    date: 'February 2024',
    text: 'With 30% of global container trade transiting through the Suez Canal, the Red Sea shipping crisis is upending supply chains.',
    link: 'https://www.jpmorgan.com/insights/global-research/supply-chain/red-sea-shipping',
  },
  {
    title: 'Kuehne & Nagel International',
    imageSrc: LogisticsImg2,
    date: 'February 2024',
    text: 'Kühne + Nagel International AG engages in the provision of logistic services. It operates through the following segments: Sea Freight, Airfreight, Overland, and Contract Logistics.',
    link: 'https://www.forbes.com/companies/kuehne-nagel-international/?sh=4263844f5141',
  },
  {
    title: 'CNBC',
    imageSrc: LogisticsImg3,
    date: 'February 2024',
    text: 'Ocean freight rates from Asia to the U.S. have begun to de- cline, providing some relief for U.S. shippers. But cargo shipping costs are still massively up since Decem',
    link: 'https://www.cnbc.com/2024/02/15/red-sea-attack-fueled-ocean-freight-inflation-is-starting-to-reverse.html#:~:text=State%20of%20Freight-,Red%20Sea%20attack%2Dfueled%20ocean%20freight%20inflation%20is%20starting%20to,on%20key%20global%20trade%20routes&text=Ocean%20freight%20rates%20from%20Asia,the%20Red%20Sea%20crisis%20began.',
  },
];

function LogisticsItem({ item }: { item: lItemProps }) {
  return (
    <div className="w-full mb-5 max-w-[400px] text-left">
      <div className="bg-gradient-to-br from-gradFrom to-gradTo px-[30px] py-[20px] rounded-sm mb-[30px]">
        <Image
          width={405}
          height={218}
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
      <Link
        href={item.link}
        target="_blank"
        className="text-orangePrimary text-[18px]/[22px]"
      >
        Know more
        <Image
          width={101}
          height={6}
          src={ArrowLong}
          className="inline-block ml-3"
          alt="arrowlong"
        />
      </Link>
    </div>
  );
}

export default function LogisticInsights() {
  return (
    <div className="px-[16px] py-[80px] lg:bg-bgLogistics bg-no-repeat bg-cover text-black">
      <div className="max-w-[1328px] mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-light text-[30px]/[34px] md:text-[40px]/[48px] text-center md:text-left">
              <i className="bg-allTittleColor rounded-md px-2 font-normal">
                Logistics
              </i>{' '}
              insights:
            </h2>
            <div className="font-light text-[16px]/[20px] md:text-[18px]/[22px] py-3 text-center md:text-left">
              stay ahead with our blog.
            </div>
          </div>

          <Link
            className="py-3 w-[184px] rounded-2xl font-medium text-white hover:opacity-80"
            href="/"
          >
            More articles
          </Link>
        </div>
        <div className="sm:flex flex-wrap justify-around mt-5 gap-3">
          {lItems.map((item, index) => (
            <LogisticsItem item={item} key={`${item.title}-${index}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
