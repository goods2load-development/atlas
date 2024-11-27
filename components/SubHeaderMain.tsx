import homeEfficiency1 from '@/assets/icons/home-efficiency-step-1.svg';
import homeEfficiency2 from '@/assets/icons/home-efficiency-step-2.svg';
import homeEfficiency3 from '@/assets/icons/home-efficiency-step-3.svg';
import homeEfficiency4 from '@/assets/icons/home-efficiency-step-4.svg';

import Image from 'next/image';

export default function SubHeaderMain() {
  return (
    <section className="py-[54px] sm:py-[80px] bg-bgOptimize bg-cover bg-center">
      <div className="px-4">
        <h2 className="max-w-[661px] text-[30px]/[34px] sm:text-[40px]/[48px] text-white text-center mb-4 mx-auto font-light">
          <i className="font-normal">Optimize</i> Efficiency{' '}
          <i className="font-normal">and</i> Reduce Costs on All Your Shipping
          Needs
        </h2>
        <div className="max-w-[873px] mx-auto text-[16px]/[24px] sm:text-[18px]/[22px] text-white text-center mb-11 font-light">
          We offer a one-stop logistics platform for all your shipping
          requirements. Our centralized platform integrates various services,
          including air, sea, and land freight forwarding. This integration
          streamlines your supply chain, reducing complexity and improving
          overall efficiency.
        </div>
      </div>
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 top-[30px] sm:top-[55px] w-full h-[2px] z-1 overflow-hidden flex flex-row gap-1">
          <div
            className="animate-infinite-scroll h-[1px] w-full absolute top-0 left-0"
            style={{ backgroundImage: 'url(/line-dashed-gray.svg)' }}
          ></div>
          <div
            className="animate-infinite-scroll h-[1px] w-full absolute top-0 left-[100%]"
            style={{ backgroundImage: 'url(/line-dashed-gray.svg)' }}
          ></div>
        </div>
        <div className="absolute inset-0 top-[210px] sm:top-[280px] w-full h-fit z-1 overflow-hidden flex flex-row gap-1">
          <div
            className="animate-infinite-scroll h-[1px] w-full absolute top-0 left-0"
            style={{ backgroundImage: 'url(/line-dashed-gray.svg)' }}
          ></div>
          <div
            className="w-full animate-infinite-scroll h-[1px] absolute top-0 left-[100%]"
            style={{ backgroundImage: 'url(/line-dashed-gray.svg)' }}
          ></div>
        </div>
        <div className="px-5 flex justify-around text-center text-grayCustom flex-wrap relative max-w-[1000px] mx-auto">
          <div className="px-1 flex flex-col text-[18px]/[22px] mb-10">
            <Image
              src={homeEfficiency1}
              width={110}
              height={110}
              alt="step-one"
              className="self-center mb-5 block w-[64px] sm:w-[110px] h-[64px] sm:h-[110px]"
            />
            1 step
            <div className="text-white text-[16px]/[20px] sm:text-[20px]/[22px] mt-3">
              Select the service
            </div>
          </div>
          <div className="px-1 flex flex-col text-[18px]/[22px] mb-10">
            <Image
              src={homeEfficiency2}
              width={110}
              height={110}
              alt="step-one"
              className="self-center mb-5 block w-[64px] sm:w-[110px] h-[64px] sm:h-[110px]"
            />
            2 step
            <div className="text-white text-[16px]/[20px] sm:text-[20px]/[22px] mt-3">
              Select the route
            </div>
          </div>
          <div className="px-1 flex flex-col text-[18px]/[22px] mb-10">
            <Image
              src={homeEfficiency3}
              width={110}
              height={110}
              alt="step-one"
              className="self-center mb-5 block w-[64px] sm:w-[110px] h-[64px] sm:h-[110px]"
            />
            3 step
            <div className="text-white text-[16px]/[20px] sm:text-[20px]/[22px] mt-3">
              Filter the solutions
            </div>
          </div>
          <div className="px-1 flex flex-col text-[18px]/[22px]">
            <Image
              src={homeEfficiency4}
              width={110}
              height={110}
              alt="step-one"
              className="self-center mb-5 block w-[64px] sm:w-[110px] h-[64px] sm:h-[110px]"
            />
            4 step
            <div className="text-white text-[16px]/[20px] sm:text-[20px]/[22px] mt-3">
              Book your order
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
