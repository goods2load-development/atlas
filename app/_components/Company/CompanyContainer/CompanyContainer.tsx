import React from "react";
import CompanyMainInfo from "@/app/_components/Company/CompanyMainInfo/CompanyMainInfo";
import CompanyStory from "@/app/_components/Company/CompanyStory/CompanyStory";
import CompanyArticle from "@/app/_components/Company/CompanyArticle/CompanyArticle";
import CompanyLeadership from "@/app/_components/Company/CompanyLeadership/CompanyLeadership";
import CompanyOurStory from "@/app/_components/Company/CompanyOurStory/CompanyOurStory";
import CompanyLocation from "@/app/_components/Company/CompanyLocation/CompanyLocation";

const CompanyContainer = () => {
  return (
    <div className="w-full  top-[600px] inset-0 flex flex-col items-center mt-80px">
      <CompanyMainInfo />
      <CompanyStory />
      <CompanyArticle />
      <CompanyLeadership />
      <CompanyOurStory />
      <CompanyLocation />
    </div>
  );
};

export default CompanyContainer;
