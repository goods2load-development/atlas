'use client';

import ErrorBoundary from './ErrorBoundary';
import JoinOurNewsLetter from './JoinOurNewsLetter';
import addressIcon from '@/assets/icons/address.svg';
import emailIcon from '@/assets/icons/email.svg';
import phoneIcon from '@/assets/icons/phone.svg';
import { useFooterHeaderStore } from '@/lib/store';

import { useEffect } from 'react';

import clsx from 'clsx';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';

import Logo from '@/components/Logo';
import Socials from '@/components/Socials';

const LangSwitcher = dynamic(() => import('./LangSwicher'), {
  ssr: false,
});

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { footerData, getFooterData } = useFooterHeaderStore();

  useEffect(() => {
    getFooterData();
  }, [getFooterData]);

  if (!footerData?.json) return null;

  return (
    <footer className="text-white min-h-[244px] bg-[#FF6720] bg-cover bg-center">
      <div className="sm:flex justify-between align-middle block py-10 max-w-[1328px] mx-auto row gap-10 px-8">
        <div className="space-y-5 sm:space-y-10 max-sm:mb-10 max-sm:text-center max-sm:flex max-sm:flex-col max-sm:items-center">
          <div className="mb-6">
            <Logo width={205} height={31} />
          </div>
          <p className="max-w-[233px] text-sm mb-7">
            GOODS2LOAD is the premier platform for reliable, cost-effective
            logistics solutions and predictive data. Our mission is to transform
            the logistics landscape by integrating leading SMEs and digitizing
            traditional freight forwarders, delivering tailored services that
            meet the needs of emerging businesses worldwide.
          </p>
          <div>
            <h3 className="font-semibold mb-2">Contacts</h3>
            <address className="not-italic flex flex-col gap-2 max-sm:items-center">
              <div className="flex gap-2 items-center">
                <Image width={17} height={17} src={addressIcon} alt="address" />
                <span>GOODS2LOAD FZ LLC</span>
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
          <div className="flex xl:flex-nowrap xl:gap-6 lg:gap-12 gap-6 justify-end flex-wrap max-sm:flex-col max-sm:mx-auto sm:h-full">
            {footerData?.json?.map((item, i) => (
              <div
                className={clsx(
                  'flex flex-col justify-between gap-8 w-full sm:w-[60%] md:w-[35%]  ',
                  i === footerData.json.length - 1
                    ? 'lg:min-w-[246px]'
                    : 'lg:min-w-max',
                )}
                key={item.title}
              >
                <div>
                  <h3 className="font-semibold mb-2 max-sm:text-center xl:whitespace-nowrap">
                    {item.title}
                  </h3>
                  {item.children?.length && (
                    <ul className="flex flex-col gap-2">
                      {item.children.map((childItem) => {
                        return (
                          <li
                            className="max-sm:text-center text-[14px]"
                            key={childItem.title}
                          >
                            {childItem?.href ? (
                              <Link className="text-sm" href={childItem?.href}>
                                {childItem.title}
                              </Link>
                            ) : (
                              <div>{childItem?.title}</div>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
                {i === footerData.json.length - 1 && <JoinOurNewsLetter />}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="text-orangePrimary font-semibold text-center py-[13px] font-[16px]/[24px] bg-white">
        GOODS2LOAD {currentYear} | All Rights Reserved
      </div>
      <div className="bg-primaryOrange py-4">
        <div className="flex items-center justify-center max-w-[1328px] mx-auto px-8">
          <nav className="text-sm flex items-center justify-center flex-wrap mx-auto">
            <Link
              className="mr-8 md:mr-12 relative link-with-line"
              href="/terms-of-service"
            >
              Terms and Conditions
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
