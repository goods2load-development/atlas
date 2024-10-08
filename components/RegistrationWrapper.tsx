"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { Suspense } from "react";

interface RegistrationWrapperProps {
  children: any;
  userRegistration?: boolean;
}

export default function RegistrationWrapper(props: RegistrationWrapperProps) {
  const { children, userRegistration } = props;
  return (
    <>
      <Header variant="secondary" />
      <main className="flex min-h-screen flex-col p-74 justify-between colored-main">
        <div className="sm:flex w-full">
          <div className="w-full sm:w-6/12 p-[16px] sm:py-16">
            <div className="max-w-[600px] mx-auto">
              <div className="text-center mb-10">
                <span className="text-[40px]/[60px] italic font-normal">
                  Welcome!
                </span>
                <br />
                <span className="text-[16px]/[20px] font-normal">
                  Please enter your details
                </span>
              </div>
              {children}
            </div>
          </div>
          <div className="min-h-[320px] sm:w-6/12 max-h-full">
            {userRegistration ? (
              <img
                alt="User Registration Image"
                className="w-full h-full object-cover"
                src="/userregistrationimg.png"
              />
            ) : (
              <img
                alt="Provider Registration Image"
                className="w-full h-full object-cover"
                src="/providerregistrationimg.png"
              />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
