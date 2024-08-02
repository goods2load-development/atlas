"use client";
import { useState } from "react";
// import XMLParser from "react-xml-parser";
import { XMLParser, XMLBuilder, XMLValidator } from "fast-xml-parser";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

function SubTitle(props: any) {
  return (
    <h3 className="border-b-[2px] border-orangePrimary pb-[16px] mb-[32px] text-[28px]/[34px] font-medium">
      {props.children}
    </h3>
  );
}

function StyledLink(props: any) {
  return (
    <Link
      href={props.href}
      className="block mb-[16px] underline hover:no-underline text-[20px]/[24px] font-medium"
    >
      {props.children}
    </Link>
  );
}

export default function Page() {
  const [data, setData] = useState<any>(undefined);
  const parser = new XMLParser();
  useState(() => {
    fetch(`/site-map.xml`).then((response) => {
      // TODO add <title> to XML file as page titles (not tested)
      const data = parser.parse(response);
    });
  });
  // if (!data) return null;
  return (
    <>
      <Header />
      <main className="min-h-screen colored-main max-w-[1328px] mx-auto py-[72px]">
        <h1 className="text-center text-[48px]/[58px]">Site Map</h1>
        <SubTitle>Home page</SubTitle>
        <div className="mb-[56px]">
          <StyledLink href="/">Home</StyledLink>
        </div>
        <SubTitle>Blog</SubTitle>
        <div className="mb-[56px] grid grid-cols-2">
          {/* TODO uncomment if XML is ready */}
          {/* {data.blog.map((item: any) => (
            <StyledLink href={item.href}>{item.title}</StyledLink>
          ))} */}
          <StyledLink href="/">Blog</StyledLink>
          <StyledLink href="/">Blog post</StyledLink>
          <StyledLink href="/">Blog post</StyledLink>
          <StyledLink href="/">Blog post</StyledLink>
          <StyledLink href="/">Blog post</StyledLink>
          <StyledLink href="/">Blog post</StyledLink>
          <StyledLink href="/">Blog post</StyledLink>
        </div>
        <div className="mb-[56px] grid grid-cols-2 gap-[200px]">
          <div>
            {/* all sections should be added manually */}
            <SubTitle>About Us</SubTitle>
            <StyledLink href="/">Blog</StyledLink>
          </div>
          <div>
            <SubTitle>FAQ</SubTitle>
            <StyledLink href="/">Truck</StyledLink>
            <StyledLink href="/">Ship</StyledLink>
            <StyledLink href="/">Plane</StyledLink>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
