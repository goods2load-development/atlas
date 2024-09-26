"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import Logo from "@/components/Logo";
import Socials from "@/components/Socials";
import { Input } from "./ui/input";
import { useFooterHeaderStore } from "@/lib/store";
import addressIcon from "@/assets/address.svg";
import phoneIcon from "@/assets/phone.svg";
import emailIcon from "@/assets/email.svg";
import arrowRightIcon from "@/assets/arrow-right-input.svg";
import ErrorBoundary from "./ErrorBoundary";
import LangSwitcher from "./LangSwicher";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { footerData, getFooterData } = useFooterHeaderStore();

  useEffect(() => {
    getFooterData();
  }, [getFooterData]);

  if (!footerData?.json) return null;

  return (
    <footer className="text-white min-h-[244px] bg-bgFooter bg-cover bg-center">
      <div className="md:flex align-middle block px-4 py-10 max-w-[1328px] mx-auto row gap-16">
        <div className="space-y-5 sm:space-y-10 max-sm:mb-10 max-sm:text-center max-sm:flex max-sm:flex-col max-sm:items-center">
          <div className="mb-6">
            <Logo width={205} height={31} />
          </div>
          <p className="max-w-[233px] text-sm mb-7">
            G2L is the premier platform for reliable, cost-effective logistics
            solutions and predictive data. Our mission is to transform the
            logistics landscape by integrating leading SMEs and digitizing
            traditional freight forwarders, delivering tailored services that
            meet the needs of emerging businesses worldwide.
          </p>
          <div>
            <h3 className="font-semibold mb-2">Contacts</h3>
            <address className="not-italic flex flex-col gap-2 max-sm:items-center">
              <div className="flex gap-2 items-center">
                <Image width={17} height={17} src={addressIcon} alt="address" />
                <span>GOODS2LLOAD FZ LLC</span>
              </div>
              <div className="flex gap-2 items-center">
                <Image width={17} height={19} src={phoneIcon} alt="phone" />
                <a href="tel:+971505574291">+971505574291</a>
              </div>
              <div className="flex gap-2 items-center">
                <Image width={17} height={17} src={emailIcon} alt="email" />
                <a href="mailto:hey@goods2load.com">hey@goods2load.com</a>
              </div>
            </address>
          </div>
          <Socials />
        </div>
        <div className="flex flex-col justify-between max-sm:items-center gap-4">
          <div className="flex gap-8 flex-wrap max-sm:flex-col max-sm:mx-auto sm:h-full">
            {footerData.json.map((item, i) => (
              <div className="flex flex-col justify-between gap-8 min-w-[216px]" key={item.title}>
                <div>
                  <h3 className="font-semibold mb-2 max-sm:text-center">
                    {item.title}
                  </h3>
                  {item.children?.length && (
                    <ul className="flex flex-col gap-2">
                      {item.children.map((childItem) => (
                        <li
                          className="max-sm:text-center"
                          key={childItem.title}
                        >
                          <Link className="text-sm" href={childItem.href}>
                            {childItem.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {i === footerData.json.length - 1 && (
                  <form className="max-w-[246px] w-full sm:ml-auto">
                    <legend className="mb-4 font-semibold">
                      Join our News Letter
                    </legend>
                    <div className="relative">
                      <Input
                        type="email"
                        pattern="email"
                        className="pr-7 w-full text-black"
                        placeholder="Enter your email"
                      />
                      <button
                        title="send"
                        className="absolute top-1/2 right-2 -translate-y-1/2"
                      >
                        <Image
                          src={arrowRightIcon}
                          width={24}
                          height={24}
                          alt="send"
                        />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="text-orangePrimary font-semibold text-center py-[13px] font-[16px]/[24px] bg-white">
        GOODS2LOAD {currentYear} | All Rights Reserved
      </div>
      <div className="bg-primaryOrange py-4">
        <div className="flex items-center justify-center max-w-[1328px] mx-auto">
          <nav className="text-sm flex items-center flex-wrap mx-auto">
            <Link
              className="mr-8 md:mr-12 relative link-with-line"
              href="/terms-of-service"
            >
              Terms and conditions
            </Link>
            <Link
              className="mr-8 md:mr-12 relative link-with-line"
              href="/cookie-policy"
            >
              Cookie Policy
            </Link>
            <Link
              className="mr-8 md:mr-12 relative link-with-line"
              href="/privacy-policy"
            >
              Privacy Policy
            </Link>
            <Link
              className="mr-8 md:mr-12 relative max-md:link-with-line"
              href="/sitemap"
            >
              Sitemap
            </Link>
            <div className="md:hidden text-center">
              <ErrorBoundary>
                <LangSwitcher />
              </ErrorBoundary>
            </div>
          </nav>
          <div className="max-md:hidden text-center">
            <ErrorBoundary>
              <LangSwitcher />
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </footer>
  );
}
