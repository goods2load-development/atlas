'use client';

import CookiesImage from '@/assets/LegacyImages/cookies.png';

import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import UIButton from '@/components/common/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const LOCAL_STORAGE_KEY_COOKIES_AGREEMENT = 'cookiesAgreement';

const ConsentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(LOCAL_STORAGE_KEY_COOKIES_AGREEMENT) === 'true')
      return;

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000); // Show popup after 2 seconds

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  const handleAcceptAll = () => {
    // Handle the accept all action
    setIsVisible(false);
    localStorage.setItem('cookiesAgreement', 'true');
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <Dialog open={isVisible} onOpenChange={handleClose}>
      <DialogContent
        className={
          'max-w-4xl md:gap-9  p-4 md:p-12 overflow-y-auto w-[95%] max-h-[90vh]'
        }
      >
        <DialogHeader className={'flex flex-row mx-auto gap-4 items-center'}>
          <Image
            src={CookiesImage}
            alt={'Cookies'}
            width={48}
            height={48}
            className={'w-[48px] h-[48px]'}
          />
          <DialogTitle className={'md:text-5xl text-2xl font-thin'}>
            Cookie <span className={'font-normal italic'}>Settings</span>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription
          className={'text-center text-blackTertiary md:text-base text-[14px]'}
        >
          By clicking &quot;Accept All,&quot; you agree that this website may
          use selected technologies to store and access data on your device.
          These technologies help us analyze visits to and use of our website,
          personalize content and functions to your preferences, and enhance
          your overall experience. This includes creating profiles to improve
          our services and marketing efforts.
          <br />
          <br />
          You also consent to the transfer of data to third-party providers in
          countries that may not have an adequate level of data protection.
          <br />
          <br />
          We use cookies and similar technologies to personalize content, tailor
          and measure ads, and provide a better experience. For more details or
          to adjust your consent settings, please review our{' '}
          <a
            href={'/terms-of-service'}
            target={'_blank'}
            rel={'noreferrer'}
            className={'underline'}
          >
            Terms and Conditions,
          </a>{' '}
          <a
            href={'/privacy-policy'}
            target={'_blank'}
            rel={'noreferrer'}
            className={'underline'}
          >
            Privacy Terms{' '}
          </a>
          , and{' '}
          <a
            href={'/cookie-policy'}
            target={'_blank'}
            rel={'noreferrer'}
            className={'underline'}
          >
            {' '}
            Cookie Policy{' '}
          </a>
          . You can also email our team at hey@goods2load.com to modify your
          settings, request a PDF copy, or exercise your data protection rights.
        </DialogDescription>
        <DialogFooter className="flex sm:justify-center md:gap-10 gap-3">
          <UIButton
            onClick={handleAcceptAll}
            className={'font-normal py-3 px-12'}
          >
            Accept All
          </UIButton>
          <DialogClose asChild>
            <UIButton
              secondary
              className={
                'font-normal text-blackTertiary text-[1rem] py-3 px-12'
              }
            >
              Reject All
            </UIButton>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConsentPopup;
