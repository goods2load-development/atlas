"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { groupBySubCategory, parseSitemap, SitemapResult } from "./utils";

function SubTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="border-b-[2px] border-orangePrimary pb-[16px] mb-[32px] sm:text-[28px]/[34px] text-[24px]/[28px] font-medium">
      {children}
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

export default function Sitemap() {
  const [data, setData] = useState<null | SitemapResult>(null);

  const getRoutes = async () => {
    try {
      const response = await fetch(`/sitemap.xml`);
      const xmlText = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, "application/xml");

      setData(parseSitemap(xmlDoc));
    } catch (error) {
      console.error("Error fetching sitemap:", error);
    }
  };

  useEffect(() => {
    getRoutes();
  }, []);

  if (!data) {
    return;
  }

  console.log({ data });

  return (
    <>
      <main className="min-h-screen colored-main max-w-[1328px] mx-auto py-10 sm:py-[72px] px-4">
        <h1 className="text-center text-[48px]/[58px] mb-8">Site Map</h1>
        <SubTitle>Home page</SubTitle>
        <div className="mb-8 sm:mb-[56px]">
          <StyledLink href={`${data.home[0].loc}`}>
            {data.home[0].title}
          </StyledLink>
        </div>
        <SubTitle>Blog</SubTitle>
        <div className="mb-[56px] grid grid-cols-1 md:grid-cols-2">
          {data.blog.map(({ title, loc }) => (
            <StyledLink key={loc} href={loc}>
              {title}
            </StyledLink>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-y-8 gap-x-[15%] mb-8">
          <div>
            <SubTitle>About Us</SubTitle>
            <StyledLink href={`${data.about[0].loc}?company`}>
              Company
            </StyledLink>
            <StyledLink href={`${data.about[0].loc}?trust`}>Trust</StyledLink>
            <StyledLink href={`${data.about[0].loc}?media`}>Media</StyledLink>
          </div>
          <div>
            <SubTitle>FAQ</SubTitle>
            <StyledLink href={`${data.help[0].loc}?truck`}>Truck</StyledLink>
            <StyledLink href={`${data.help[0].loc}?ship`}>Ship</StyledLink>
            <StyledLink href={`${data.help[0].loc}?plane`}>Plane</StyledLink>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-y-8 gap-x-[15%] mb-8">
          <div>
            <SubTitle>Log in</SubTitle>
            <StyledLink href={`${data["sign-in"][0].loc}`}>Log in</StyledLink>
          </div>
          <div>
            <SubTitle>Sign up</SubTitle>
            <StyledLink href={`${data["sign-up"][0].loc}?provider`}>
              Sign Up for Logistic Provider
            </StyledLink>
            <StyledLink href={`${data["sign-up"][0].loc}`}>
              Sign Up for User
            </StyledLink>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-y-8 gap-x-[15%] mb-8">
          <div>
            <SubTitle>Partners</SubTitle>
            {data.partners.map(({ title, loc }) => (
              <StyledLink key={loc} href={loc}>
                {title}
              </StyledLink>
            ))}
          </div>
          <div>
            <SubTitle>Career</SubTitle>
            <StyledLink href={`${data.career[0].loc}`}>Career</StyledLink>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-y-8 gap-x-[15%] mb-8">
          <div>
            <SubTitle>Legacy</SubTitle>
            {data.legacy.map(({ title, loc }) => (
              <StyledLink key={loc} href={loc}>
                {title}
              </StyledLink>
            ))}
          </div>
          <div>
            <SubTitle>Sitemap</SubTitle>
            <StyledLink href={`${data.sitemap[0].loc}`}>Sitemap</StyledLink>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-y-8 gap-x-[15%] mb-8">
          {groupBySubCategory(data["seo-page"]).map((group) => {
            return (
              <div key={group[0].title}>
                <SubTitle>{group[0].subCategory}</SubTitle>
                {group.map(({ title, loc }) => (
                  <StyledLink key={loc} href={loc}>
                    {title}
                  </StyledLink>
                ))}
              </div>
            );
          })}
        </div>
        <SubTitle>Other</SubTitle>
        <div className="mb-[56px] grid grid-cols-1 md:grid-cols-2">
          {data.other.map(({ title, loc }) => (
            <StyledLink key={loc} href={loc}>
              {title}
            </StyledLink>
          ))}
        </div>
      </main>
    </>
  );
}
