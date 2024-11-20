import './globals.css';
import { WeglotProvider } from './weglot/WeglotProvider';
import CaptchaProvider from '@/lib/providers/CaptchaProvider';

import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { headers } from 'next/headers';

import ToasterWrapper from '@/components/Interceptor';
import NextAuthProvider from '@/components/NextAuthProvider';
import { Toaster } from '@/components/ui/toaster';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export function generateMetadata(): Metadata {
  const requestHeaders = headers();
  const canonical = requestHeaders.get('referer') || 'https://goods2load.com';
  const imageUrl = `${process.env.NEXT_PUBLIC_CLIENT_URL}/thumbnail.png`;

  return {
    title: 'Goods2load',
    description: 'Goods2load offers innovative logistics solutions.',
    openGraph: {
      title: 'Goods2load',
      description:
        'Goods2load offers innovative logistics solutions for global trade.',
      url: canonical,
      images: [
        {
          url: imageUrl,
          alt: 'Goods2load',
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      title: 'Goods2load',
      description:
        'Goods2load offers innovative logistics solutions for global trade.',
      images: imageUrl,
    },
    alternates: {
      canonical,
    },
  };
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
