"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

interface SEOPagesTemplateProps {
  children: string | JSX.Element | JSX.Element[] | any;
  imgSrc: string;
  title: string;
}
export function Quote(props: any) {
  return (
    <blockquote className="border-l-[2px] border-[#FF6720] pl-[16px] md:ml-[40px] my-[10px] mb-[32px]">
      {props.children}
    </blockquote>
  );
}

export function SubTitle(props: any) {
  return (
    <h3 className="text-[24px]/[28px] md:text-[28px]/[34px] font-medium mb-[16px]">
      {props.children}
    </h3>
  );
}

export function MarkedList({ items }: any) {
  return (
    <ul className="list-disc pl-[25px] text-[18px]/[26px] mb-[32px]">
      {items.map((item: any, index: number) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

export function OrderedList({ items }: any) {
  return (
    <ol className="list-decimal pl-[25px] text-[18px]/[26px] mb-[32px]">
      {items.map((item: any, index: number) => (
        <li key={index}>{item}</li>
      ))}
    </ol>
  );
}

export default function SEOPagesTemplate(props: SEOPagesTemplateProps) {
  const { children, imgSrc, title } = props;
  return (
    <>
      <Header />
      <main className="min-h-screen colored-main">
        <div className="min-h-[216px] lg:min-h-[300px]">
          <img
            className="w-full h-[300px] min-h-full object-cover"
            src={imgSrc}
          />
        </div>
        <div className="px-[16px] py-[40px] md:py-[72px] bg-seomobile md:bg-seo bg-no-repeat bg-top bg-contain">
          <div className="max-w-[1296px]  mx-auto [&>img]:mb-[32px] [&>p]:mb-[32px]">
            <h1 className="italic text-[34px]/[38px] md:text-[48px]/[58px] font-normal mb-[48px]">
              {title}
            </h1>
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
