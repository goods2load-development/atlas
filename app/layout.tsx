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
        <body className={poppins.className}>{children}</body>
      </html>
    </NextAuthProvider>
  );
}
