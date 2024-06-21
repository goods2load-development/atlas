"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface LoginWrapperProps {
  children: string | JSX.Element | JSX.Element[];
}

export default function LoginWrapper(props: LoginWrapperProps) {
  const { children } = props;
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col p-74 justify-between colored-main">
        <div className="sm:flex">
          <div className="sm:w-6/12 p-5 sm:p-16">
            <div className="text-center mb-10">
              <span className="text-[40px]/[60px] italic font-normal">
                Welcome back!
              </span>
              <br />
              <span className="text-[16px]/[20px] font-normal">
                Welcome back! Please, enter your details
              </span>
            </div>
            {children}
          </div>
          <div className="min-h-[320px] sm:w-6/12">
            <img
              className="w-full object-cover"
              src="/providerregistrationimg.png"
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
