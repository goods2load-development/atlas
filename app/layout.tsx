import './globals.css';
import OpenWidget from './openwidget/OpenWidget';
import { OpenWidgetProvider } from './openwidget/OpenWidgetProvider';
import { WeglotProvider } from './weglot/WeglotProvider';
import { generateDefaultMetadata } from '@/lib/metadataUtils';
import GtagProvider from '@/lib/providers/GtagProvider';

import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import Image from 'next/image';
import NextTopLoader from 'nextjs-toploader';

import ToasterWrapper from '@/components/Interceptor';
import NextAuthProvider from '@/components/NextAuthProvider';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';
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
          {/* Weglot and OpenWidget Providers */}
          <WeglotProvider />
          <OpenWidgetProvider />

          {/* Meta Tag for Google Site Verification */}
          <meta
            name="google-site-verification"
            content="DhV93E_5VWkiNA1ic5_JkLvLifE-XJVbq5uOwE4TkE8"
          />

          {/* Bing Webmaster Meta Tag */}
          <meta
            name="msvalidate.01"
            content="F7DB9475600B7983F23BF99A0B1D3081"
          />

          {/* Microsoft Clarity Script */}
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "pgv2b4qmpq");
              `,
            }}
          />
        </head>
        <body className={poppins.className}>
          {/* Top Loader */}
          <NextTopLoader
            color="#000"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl
            showSpinner={false}
            easing="ease"
            speed={200}
          />

          {/* WhatsApp Chat Button — hidden on /dashboard and /agent routes */}
          <WhatsAppFloatingButton />

          {/* Children and Other Components */}
          <ToasterWrapper>{children}</ToasterWrapper>
          <Toaster />
          <OpenWidget />
          <GtagProvider />
          {/* <GoogleTagManager
            gtmId={process.env.NEXT_PUBLIC_GOOGLE_GTAG_SECRET as string}
          /> */}
        </body>
      </html>
    </NextAuthProvider>
  );
}
