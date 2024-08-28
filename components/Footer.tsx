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
import LangSwitcher from "./LangSwicher";
import * as React from "react";
import ErrorBoundary from "./ErrorBoundary";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="text-white min-h-[244px] pt-[56px] bg-bgFooter bg-cover bg-center">
      <div className="md:flex justify-between align-middle block px-[16px] max-w-[1328px] mx-auto row gap-10">
        <div className="space-y-5 sm:space-y-10 mb-10">
          <Logo width={340} height={42} />
          <div className="hidden sm:block">
            <Socials />
          </div>
        </div>
        <div className="sm:flex lg:w-1/2 justify-between gap-3">
          <Accordion
            type="single"
            collapsible
            defaultValue="item-1"
            className="w-24 f-accordion"
          >
            <AccordionItem
              value="item-1"
              className="border-transparent hidden sm:block"
            >
              <AccordionTrigger
                className="pt-0 pb-3 font-normal"
                usageContext={"footer"}
              >
                About us
              </AccordionTrigger>
              <AccordionContent>
                <Link
                  href="/about-us?company"
                  className="block pb-3 font-light"
                >
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
          <div>
            <Accordion
              type="single"
              collapsible
              defaultValue="item-1"
              className="w-32 f-accordion hidden sm:block"
            >
              <AccordionItem value="item-1" className="border-transparent">
                <AccordionTrigger
                  className="pt-0 pb-3 font-normal"
                  usageContext={"footer"}
                >
                  Partners
                </AccordionTrigger>
                <AccordionContent>
                  <Link
                    href="/partners-with-us"
                    className="block pb-3 font-light"
                  >
                    Partner with us
                  </Link>
                  <Link href="/partners" className="block pb-3 font-light">
                    Our partners
                  </Link>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Link href="/career" className="sm:block pb-3 font-light hidden">
              Career
            </Link>
          </div>

          <div className="text-center sm:hidden pb-3">
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
            <Link
              href="/partners#our-partners"
              className="block pb-3 font-light"
            >
              Our partners
            </Link>
            <Link href="/career" className="block pb-3 font-light">
              Career
            </Link>
          </div>
          <div className="text-center sm:text-left">
            <Link href="/help" className="block pb-4">
              FAQs
            </Link>
            <Link href="/terms-of-service" className="block pb-4">
              Terms and Conditions
            </Link>
            <Link href="/privacy-policy" className="block pb-4">
              Privacy Policy
            </Link>
            <Link href="/cookie-policy" className="block pb-4">
              Cookie Policy
            </Link>
          </div>
        </div>
        <div className="text-center">
          <ErrorBoundary>
            <LangSwitcher />
          </ErrorBoundary>
        </div>
        <div className="flex sm:hidden justify-center pt-[40px]">
          <Socials />
        </div>
      </div>
      <div className="color-white text-center py-[13px] font-[16px]/[24px] bg-[#ff6720] font-light">
        GOODS2LOAD {currentYear} | All Rights Reserved
      </div>
    </footer>
  );
}
