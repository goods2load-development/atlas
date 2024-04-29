import React from 'react';
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/headerLogo.svg"

const Header = () => {
    return (
      <div className="relative">
        <header className="bg-headerBg w-full flex justify-center py-4 absolute ">
          <nav className="max-w-[1440px] w-full flex justify-between pr-[40px]">
            <Image src={Logo} alt="logo" />
            <div className="flex gap-[27px] pr-40px">
              <Link href={"/"}>Help</Link>
              <Link href={"/"}>Log in</Link>
              <p>Sign up</p>
              <p>EN</p>
            </div>
          </nav>
        </header>
      </div>
    );
};

export default Header;
