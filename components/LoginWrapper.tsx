'use client';

import LogInImg from '@/assets/images/loginImg.png';

import Image from 'next/image';

import Footer from '@/components/Footer';

interface LoginWrapperProps {
  children: React.ReactNode;
}

export default function LoginWrapper(props: LoginWrapperProps) {
  const { children } = props;

  return (
    <>
      <main className="grid grid-cols-1 min-h-screen p-74 colored-main">
        <div className="sm:flex">
          <div className="sm:w-6/12 p-[16px] sm:py-16">
            <div className="max-w-[528px] mx-auto">
              <div className="text-center mb-10">
                <span className="sm:text-[38px]/[42px] text-[40px]/[60px] italic font-normal">
                  Welcome back!
                </span>
                <br />
                <span className="text-[16px]/[20px] font-normal">
                  Welcome back! Please, enter your details
                </span>
              </div>
              {children}
            </div>
          </div>
          <div className="min-h-[320px] sm:w-6/12 relative">
            <Image
              alt="Login Image"
              src={LogInImg}
              className="object-cover"
              fill
              priority
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
