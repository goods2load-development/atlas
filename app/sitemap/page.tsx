"use client";
import { useEffect, useState } from "react";
// import XMLParser from "react-xml-parser";
import { XMLParser, XMLBuilder, XMLValidator } from "fast-xml-parser";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

const categories = ['home', 'blogs', 'about', 'faq', 'login', 'signUp', 'partners', 'career', 'legacy', 'sitemap', 'newsAndInsights', 'industriesWeServe'];

function SubTitle(props: any) {
  return (
    <h3 className="border-b-[2px] border-orangePrimary pb-[16px] mb-[32px] sm:text-[28px]/[34px] text-[24px]/[28px] font-medium">
      {props.children}
    </h3>
  );
}

function StyledLink(props: any) {
  return (
    <Link
      href={props.href}
      className="block mb-[16px] underline hover:no-underline sm:text-[20px]/[24px] sm:font-medium text-[18px]/[22px] font-normal"
    >
      {props.children}
    </Link>
  );
}

export default function Page() {
  const [data, setData] = useState<any>(undefined);
  const parser = new XMLParser();


const getRoutes = async () => {
  try {
    const response = await fetch(`/site-map.xml`);
    const xmlText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "application/xml");
    const urls: any = {};

    categories.forEach(category => {
      const categoryNode = xmlDoc.getElementsByTagName(category)[0];
      if (categoryNode) {
        urls[category] = Array.from(categoryNode.getElementsByTagName("url")).map(urlNode => ({
          href: urlNode.getElementsByTagName("href")[0].textContent,
          title: urlNode.getElementsByTagName("title")[0].textContent
        }));
      }
    });

    setData(urls);
  } catch (error) {
    console.error('Error fetching sitemap:', error);
  }
};

  useEffect(() => {
    getRoutes();
  }, []);

  if(!data){
    return;
  }

  return (
    <>
      <Header />
      <main className="min-h-screen colored-main max-w-[1328px] mx-auto py-10 sm:py-[72px] px-4">
        <h1 className="text-center text-[48px]/[58px] mb-8">Site Map</h1>
        <SubTitle>Home page</SubTitle>
        <div className="mb-8 sm:mb-[56px]">
          <StyledLink href={`${data.home[0].href}`}>{data.home[0].title}</StyledLink>
        </div>
        <SubTitle>Blog</SubTitle>
        <div className="mb-[56px] sm:flex flex-wrap justify-between">
          {
            data.blogs.map(({title, href}: any) => {
              return <div className="w-[35%] md:w-[40%] lg:w-[43%]"><StyledLink href={`${href}`}>{title}</StyledLink></div>
            })
          }
        </div>
        <div className="mb-8 sm:mb-[56px] sm:grid grid-cols-2 gap-[200px]">
          <div className="mb-8 sm:mb-0">
            <SubTitle>About Us</SubTitle>
            {
              data.about.map(({title, href}: any) => {
                return <StyledLink href={`${href}`}>{title}</StyledLink>
              })
            }
          </div>
          <div>
            <SubTitle>FAQ</SubTitle>
            {
              data.faq.map(({title, href}: any) => {
                return <StyledLink href={`${href}`}>{title}</StyledLink>
              })
            }
          </div>
        </div>
        <div className="mb-8 sm:mb-[56px] sm:grid sm:grid-cols-2 gap-[200px]">
          <div className="mb-8 sm:mb-0">
            <SubTitle>Login In</SubTitle>
            <StyledLink href={`${data.login[0].href}`}>{data.login[0].title}</StyledLink>
          </div>
          <div>
            <SubTitle>Sign Up</SubTitle>
            {
              data.signUp.map(({title, href}: any) => {
                return <StyledLink href={`${href}`}>{title}</StyledLink>
              })
            }
          </div>
        </div>

        <div className="mb-8 sm:mb-[56px] sm:grid grid-cols-2 gap-[200px]">
          <div className="mb-8 sm:mb-0">
            <SubTitle>Partners</SubTitle>
            {
              data.partners.map(({title, href}: any) => {
                return <StyledLink href={`${href}`}>{title}</StyledLink>
              })
            }
          </div>
          <div>
            <SubTitle>Career</SubTitle>
            <StyledLink href={`${data.career[0].href}`}>{data.career[0].title}</StyledLink>
          </div>
        </div>

        <div className="mb-8 sm:mb-[56px] sm:grid grid-cols-2 gap-[200px]">
          <div className="mb-8 sm:mb-0">
            <SubTitle>Legacy</SubTitle>
            {
              data.legacy.map(({title, href}: any) => {
                return <StyledLink href={`${href}`}>{title}</StyledLink>
              })
            }
          </div>
          <div>
            <SubTitle>Site Map</SubTitle>
            <StyledLink href={`${data.sitemap[0].href}`}>{data.sitemap[0].title}</StyledLink>
          </div>
        </div>

         <div className="mb-8 sm:mb-[56px] sm:grid grid-cols-2 gap-[200px]">
          <div className="mb-8 sm:mb-0">
            <SubTitle>News and Insights</SubTitle>
              {
                data.newsAndInsights.map(({title, href}: any) => {
                  return <StyledLink href={`${href}`}>{title}</StyledLink>
                })
              }
          </div>
          <div>
            <SubTitle>Industries we serve</SubTitle>
            {
                data.industriesWeServe.map(({title, href}: any) => {
                  return <StyledLink href={`${href}`}>{title}</StyledLink>
                })
              }
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
