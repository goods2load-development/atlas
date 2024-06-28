import Image from "next/image";

export default function SubHeaderMain() {
  return (
    <div className="py-[54px] sm:py-[80px] bg-bgOptimize bg-cover bg-center">
      <h2 className="px-5 text-[30px]/[34px] sm:text-[40px]/[48px] text-white text-center mb-3 sm:font-normal font-light">
        Optimize <i>efficiency</i> and <i>savings</i>
      </h2>
      <div className="px-5 text-[16px]/[24px] sm:text-[18px]/[22px] text-white text-center mb-10 sm:font-normal font-light">
        through our matchmaker platform, reducing both time
        <br /> and costs for businesses.
      </div>
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 top-[30px] sm:top-[55px] w-full h-fit z-1 overflow-hidden flex flex-row gap-1">
          <img
            className="w-full animate-infinite-scroll"
            src="/line-dashed-gray.svg"
            alt={"line"}
          />
          <img
            className="w-full animate-infinite-scroll"
            src="/line-dashed-gray.svg"
            alt={"line"}
          />
        </div>
        <div className="absolute inset-0 top-[210px] sm:top-[280px] w-full h-fit z-1 overflow-hidden flex flex-row gap-1">
          <img
            className="w-full animate-infinite-scroll"
            src="/line-dashed-gray.svg"
            alt={"line"}
          />
          <img
            className="w-full animate-infinite-scroll"
            src="/line-dashed-gray.svg"
            alt={"line"}
          />
        </div>
        <div className="px-5 flex justify-around text-center text-grayCustom flex-wrap relative max-w-[1000px] mx-auto">
          <div className="px-1 flex flex-col text-[18px]/[22px] mb-10">
            <img
              src="/optimizeicon1.png"
              alt="Instagram"
              className="self-center mb-5 block w-[64px] sm:w-[110px] h-[64px] sm:h-[110px]"
            />
            1 step
            <div className="text-white text-[16px]/[20px] sm:text-[20px]/[22px] mt-3">
              Select the service
            </div>
          </div>
          <div className="px-1 flex flex-col text-[18px]/[22px] mb-10">
            <img
              src="/optimizeicon2.png"
              alt="Instagram"
              width={110}
              height={110}
              className="self-center mb-5 block w-[64px] sm:w-[110px] h-[64px] sm:h-[110px]"
            />
            2 step
            <div className="text-white text-[16px]/[20px] sm:text-[20px]/[22px] mt-3">
              Select the route
            </div>
          </div>
          <div className="px-1 flex flex-col text-[18px]/[22px] mb-10">
            <img
              src="/optimizeicon3.png"
              alt="Instagram"
              width={110}
              height={110}
              className="self-center mb-5 block w-[64px] sm:w-[110px] h-[64px] sm:h-[110px]"
            />
            3 step
            <div className="text-white text-[16px]/[20px] sm:text-[20px]/[22px] mt-3">
              Compare the price
            </div>
          </div>
          <div className="px-1 flex flex-col text-[18px]/[22px]">
            <img
              src="/optimizeicon3.png"
              alt="Instagram"
              width={110}
              height={110}
              className="self-center mb-5 block w-[64px] sm:w-[110px] h-[64px] sm:h-[110px]"
            />
            4 step
            <div className="text-white text-[16px]/[20px] sm:text-[20px]/[22px] mt-3">
              Book your order
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
