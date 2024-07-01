"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import Logo from "@/components/Logo";
import Socials from "@/components/Socials";
import { useEffect } from "react";

export default function Footer() {
  useEffect(() => {
    fetchData().then((data) => console.log(data));
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://34.118.123.231:8000/api/careers");

      if (!response.ok) {
        throw new Error("123");
      }

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <footer className="text-white min-h-[244px] pt-[56px] bg-bgFooter bg-cover bg-center">
      <div className="sm:flex gap-2 justify-between md:px-16 px-8 block md:flex-nowrap flex-wrap">
        <div className="space-y-5 sm:space-y-10 mb-10 sm:mb-0 md:mb-10 sm:w-full md:w-auto">
          <Logo width={340} height={42} />
          <div className="hidden sm:block">
            <Socials />
          </div>
        </div>
        <Accordion
          type="single"
          collapsible
          defaultValue="item-1"
          className="w-32 f-accordion"
        >
          <AccordionItem
            value="item-1"
            className="border-transparent hidden sm:block"
          >
            <AccordionTrigger className="pt-0 pb-3 font-normal text-nowrap justify-start gap-2">
              About us
            </AccordionTrigger>
            <AccordionContent>
              <Link href="/about-us?company" className="block pb-3 font-light">
                Company
              </Link>
              <Link href="/about-us?trust" className="block pb-3 font-light">
                Trust
              </Link>
              <Link href="/about-us?media" className="block pb-3 font-light">
                Media
              </Link>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion
          type="single"
          collapsible
          defaultValue="item-1"
          className="w-32 f-accordion hidden sm:block"
        >
          <AccordionItem value="item-1" className="border-transparent">
            <AccordionTrigger className="pt-0 font-normal justify-start gap-2">
              Partners
            </AccordionTrigger>
            <AccordionContent>
              <Link href="/partners" className="block pb-3 font-light">
                Partner with us
              </Link>
              <Link
                href="/partners#our-partners"
                className="block pb-3 font-light"
              >
                Our partners
              </Link>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="sm:hidden pb-8 text-center">
          <p className="font-medium pb-3">About us</p>
          <Link href="/about-us?company" className="block pb-3 font-light">
            Company
          </Link>
          <Link href="/about-us?trust" className="block pb-3 font-light">
            Trust
          </Link>
          <Link href="/about-us?media" className="block pb-3 font-light">
            Media
          </Link>
          <p className="font-medium pb-3 pt-5">Partners</p>
          <Link href="/partners" className="block pb-3 font-light">
            Partner with us
          </Link>
          <Link href="/partners#our-partners" className="block pb-3 font-light">
            Our partners
          </Link>
        </div>
        <div className="md:text-left text-center">
          <Link
            href="/career"
            className="inline-block pb-4 font-medium text-[17px]"
          >
            Career
          </Link>
          <Link href="/help" className="block pb-4 font-medium">
            Help centre
          </Link>
          <Link
            href="/terms-of-service"
            className="block pb-4 font-medium text-[17px]"
          >
            Terms and Conditions
          </Link>
          <Link
            href="/privacy-policy"
            className="block pb-4 font-medium text-[17px]"
          >
            Privacy Policy
          </Link>
          <Link
            href="/cookie-policy"
            className="block pb-4 font-medium text-[17px]"
          >
            Cookie Policy
          </Link>
        </div>
        <div className="flex sm:hidden justify-center pt-[40px]">
          <Socials />
        </div>
      </div>
      <div className="color-white text-center py-[13px] font-[16px]/[24px] bg-[#ff6720] font-light">
        GOODS2LOAD 2024 | All Rights Reserved
      </div>
    </footer>
  );
}
