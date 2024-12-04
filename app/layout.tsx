import './globals.css';
import { OpenWidgetProvider } from './openwidget/OpenWidgetProvider';
import { WeglotProvider } from './weglot/WeglotProvider';
import WhatsupIcon from '@/assets/icons/whatsupicon.svg';
import { generateDefaultMetadata } from '@/lib/metadataUtils';

import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import Head from 'next/head';
import Image from 'next/image';

import ToasterWrapper from '@/components/Interceptor';
import NextAuthProvider from '@/components/NextAuthProvider';
import { Toaster } from '@/components/ui/toaster';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export function generateMetadata(): Metadata {
  return generateDefaultMetadata();
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NextAuthProvider>
      <html lang="en">
        <head>
          <WeglotProvider />
          <OpenWidgetProvider />
        </head>
        <body className={poppins.className}>
          <a
            href="https://wa.me/+971505574291"
            className="sm:pl-[20px] text-[14px]/[16px] bg-white rounded-full flex flex-row border-[1px] shadow-lg border-white fixed z-50 bottom-[16px] sm:bottom-[40px] right-[16px] sm:right-[40px]"
            target="_blank"
          >
            <span className="hidden sm:inline self-center pr-[10px]">
              Chat by WhatsApp
              <br /> with us!
            </span>
            <Image
              width={52}
              height={52}
              src={WhatsupIcon}
              alt="whatsup"
              className="float-right w-[52px] h-[52px]"
            />
          </a>
          <ToasterWrapper>{children}</ToasterWrapper>
          <Toaster />
        </body>
      </html>
    </NextAuthProvider>
  );
}
