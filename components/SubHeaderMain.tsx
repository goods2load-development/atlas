import Image from "next/image";

export default function SubHeaderMain() {
  return (
    <div className="px-16 py-[80px] relative bg-bgOptimize bg-cover bg-center">
      <h2 className="text-[40px]/[48px] text-white text-center">
        Optimize <i>efficiency</i> and <i>savings</i>
      </h2>
      <div className="text-[18px]/[22px] text-white pb-[30px] text-center">
        through our matchmaker platform, reducing both time
        <br /> and costs for businesses.
      </div>
      <a
        href="https://wa.me/<number>"
        className="pl-[20px] text-[14px]/[16px] bg-white rounded-full flex flex-row border-2 border-white absolute top-[90px] right-[40px]"
      >
        <span className="self-center pr-[10px]">
          Chat by WhatsApp
          <br /> with us!
        </span>
        <Image
          src="/whatsupicon.png"
          alt="whatsup"
          width={52}
          height={52}
          className="float-right"
        />
      </a>
      <div className="flex justify-around text-center text-grayCustom">
        <div className="flex flex-col text-[18px]/[22px]">
          <Image
            src="/optimizeicon1.png"
            alt="Instagram"
            width={110}
            height={110}
            className="self-center mb-5"
          />
          1 step
          <div className="text-white text-[20px]/[22px] mt-5">
            Select the service
          </div>
        </div>
        <div className="flex flex-col text-[18px]/[22px]">
          <Image
            src="/optimizeicon2.png"
            alt="Instagram"
            width={110}
            height={110}
            className="self-center mb-5"
          />
          2 step
          <div className="text-white text-[20px]/[22px] mt-5">
            Select the route
          </div>
        </div>
        <div className="flex flex-col text-[18px]/[22px]">
          <Image
            src="/optimizeicon3.png"
            alt="Instagram"
            width={110}
            height={110}
            className="self-center mb-5"
          />
          3 step
          <div className="text-white text-[20px]/[22px] mt-5">
            Compare the price
          </div>
        </div>
        <div className="flex flex-col text-[18px]/[22px]">
          <Image
            src="/optimizeicon3.png"
            alt="Instagram"
            width={110}
            height={110}
            className="self-center mb-5"
          />
          4 step
          <div className="text-white text-[20px]/[22px] mt-5">
            Book your order
          </div>
        </div>
      </div>
    </div>
  );
}
