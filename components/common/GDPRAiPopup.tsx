'use client';

import CookiesImage from '@/assets/LegacyImages/cookies.png';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import UIButton from '@/components/common/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const LOCAL_STORAGE_KEY = 'GDPRAIagreement';
const CONSENT_DELAY = 2000;

const GDPRAiPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(LOCAL_STORAGE_KEY) === 'true') return;

    const timer = setTimeout(() => setIsVisible(true), CONSENT_DELAY);
    return () => clearTimeout(timer);
  }, []);

  const handleAcceptAll = () => {
    setIsVisible(false);
    localStorage.setItem(LOCAL_STORAGE_KEY, 'true');
  };

  return (
    <Dialog open={isVisible}>
      <DialogContent className="max-w-4xl p-4 md:p-12 md:gap-9 w-[95%] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center mx-auto gap-4">
          <Image src={CookiesImage} alt="Cookies" width={48} height={48} />
          <DialogTitle className="text-2xl md:text-5xl font-thin">
            AI Usage <span className="font-normal italic">and</span> Disclaimer
            Notice
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center text-blackTertiary text-[14px] md:text-base">
          By choosing to upload an image and use the image search feature, you
          agree to the Terms of Service and that your data will be processed
          according to our Privacy Policy. You agree that your images may be
          stored and used to improve website functionalities, and may also be
          forwarded to Transportation Providers. You must not upload any
          personal photos or personally identifiable images.
        </DialogDescription>
        <DialogFooter className="flex sm:justify-center md:gap-10 gap-3">
          <UIButton
            onClick={handleAcceptAll}
            className="font-normal py-3 px-12"
          >
            Continue
          </UIButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GDPRAiPopup;
