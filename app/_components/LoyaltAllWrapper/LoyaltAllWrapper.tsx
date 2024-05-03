"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface LoyaltAllWrapper {
  children: string | JSX.Element | JSX.Element[];
}

export default function LoyaltAllWrapper(props: LoyaltAllWrapper) {
  const { children } = props;
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
