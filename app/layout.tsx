import './globals.css';
import { WeglotProvider } from './weglot/WeglotProvider';
import { generateDefaultMetadata } from '@/lib/metadataUtils';
import CaptchaProvider from '@/lib/providers/CaptchaProvider';

import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

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
      <CaptchaProvider>
        <html lang="en">
          <head>
            <WeglotProvider />
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
              <img
                src="/whatsupicon.svg"
                alt="whatsup"
                className="float-right w-[52px] h-[52px]"
              />
            </a>
            <ToasterWrapper>{children}</ToasterWrapper>
            <Toaster />
          </body>
        </html>
      </CaptchaProvider>
    </NextAuthProvider>
  );
}
