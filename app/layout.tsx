import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import NextAuthProvider from "@/components/NextAuthProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Goods2load",
  description: "no description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NextAuthProvider>
      <html lang="en">
        <body className={poppins.className}>
          <a
            href="https://wa.me/+971505574291"
            className="sm:pl-[20px] text-[14px]/[16px] bg-white rounded-full flex flex-row border-2 border-white fixed z-20 bottom-[16px] sm:bottom-[40px] right-[16px] sm:right-[40px]"
          >
            <span className="hidden sm:inline self-center pr-[10px]">
              Chat by WhatsApp
              <br /> with us!
            </span>
            <img
              src="/whatsupicon.png"
              alt="whatsup"
              className="float-right w-[52px] h-[52px]"
            />
          </a>
          {children}
        </body>
      </html>
    </NextAuthProvider>
  );
}
