'use client';

import WhatsupIcon from '@/assets/icons/whatsupicon.svg';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

// Hidden on dashboard and agent routes — those have their own WhatsApp UX
const HIDDEN_PATHS = ['/dashboard', '/agent'];

export default function WhatsAppFloatingButton() {
  const pathname = usePathname();
  if (HIDDEN_PATHS.some((p) => pathname?.startsWith(p))) return null;

  return (
    <a
      href="https://wa.me/+971505574291"
      className="sm:pl-[20px] text-[14px]/[16px] bg-white rounded-full flex flex-row border-[1px] shadow-lg border-white fixed z-50 bottom-[16px] sm:bottom-[40px] right-[16px] sm:right-[40px]"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="hidden sm:inline self-center pr-[10px]">
        WhatsApp us!
      </span>
      <Image
        width={52}
        height={52}
        src={WhatsupIcon}
        alt="whatsup"
        className="float-right w-[52px] h-[52px]"
      />
    </a>
  );
}
