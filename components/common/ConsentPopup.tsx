'use client';

import CookiesImage from '@/assets/images/cookies.png';

import { useEffect, useState } from 'react';

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

const LOCAL_STORAGE_KEY = 'cookiesAgreement';

const ConsentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showOnScroll = () => {
      if (localStorage.getItem(LOCAL_STORAGE_KEY) === 'true') return;

      if (window.scrollY > 100) {
        setIsVisible(true);
        window.removeEventListener('scroll', showOnScroll);
      }
    };

    window.addEventListener('scroll', showOnScroll);
    return () => window.removeEventListener('scroll', showOnScroll);
  }, []);

  const handleAcceptAll = () => {
    setIsVisible(false);
    localStorage.setItem(LOCAL_STORAGE_KEY, 'true');
  };

  const handleClose = () => setIsVisible(false);

  return (
    <Dialog open={isVisible} onOpenChange={handleClose}>
      <DialogContent
        isCloseBtn={false}
        className="max-w-4xl p-4 md:p-12 md:gap-9 w-[95%] max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader className="flex flex-row items-center mx-auto gap-4">
          <Image src={CookiesImage} alt="Cookies" width={48} height={48} />
          <DialogTitle className="text-2xl md:text-5xl font-thin">
            Cookie <span className="font-normal italic">Settings</span>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center text-blackTertiary text-[14px] md:text-base">
          By clicking &quot;Accept All,&quot; you agree that this website may
          use selected technologies to store and access data on your device.
          These technologies help us analyze visits to and use of our website,
          personalize content and functions to your preferences, and enhance
          your overall experience.
          <br />
          <br />
          You also consent to the transfer of data to third-party providers in
          countries that may not have an adequate level of data protection.
          <br />
          <br />
          For more details or to adjust your consent settings, please review our{' '}
          <a
            href="/terms-of-service"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            Terms and Conditions
          </a>
          ,{' '}
          <a
            href="/privacy-policy"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            Privacy Terms
          </a>
          , and{' '}
          <a
            href="/cookie-policy"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            Cookie Policy
          </a>
          . You can also email our team at hey@goods2load.com to modify your
          settings or exercise your data protection rights.
        </DialogDescription>
        <DialogFooter className="flex sm:justify-center md:gap-10 gap-3">
          <UIButton
            onClick={handleAcceptAll}
            className="font-normal py-3 px-12"
          >
            Accept All
          </UIButton>
          <DialogClose asChild>
            <UIButton
              secondary
              className="font-normal text-blackTertiary text-[1rem] py-3 px-12"
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
