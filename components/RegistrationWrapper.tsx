"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface RegistrationWrapperProps {
  children: any;
  userRegistration?: boolean;
  firstStep?: boolean;
}

export default function RegistrationWrapper(props: RegistrationWrapperProps) {
  const { children, userRegistration, firstStep } = props;
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col p-74 justify-between colored-main">
        <div className="sm:flex w-full">
          <div className="w-full sm:w-6/12 p-5 sm:p-16">
            <div className="text-center mb-10">
              <span className="text-[40px]/[60px] italic font-normal">
                {firstStep ? "Welcome!" : "You are almost there"}
              </span>
              <br />
              {firstStep && (
                <span className="text-[16px]/[20px] font-normal">
                  Please enter your details
                </span>
              )}
            </div>
            {children}
          </div>
          <div className="min-h-[320px] sm:w-6/12">
            {userRegistration ? (
              <img
                className="w-full object-cover"
                src="/userregistrationimg.png"
              />
            ) : (
              <img
                className="w-full object-cover"
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
