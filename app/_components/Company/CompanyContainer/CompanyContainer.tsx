import CompanyStoryMobileSlider from '../CompanyStory/MobileSlider/CompanyStoryMobileSlider';
import CompanyArticle from '@/app/_components/Company/CompanyArticle/CompanyArticle';
import CompanyLeadership from '@/app/_components/Company/CompanyLeadership/CompanyLeadership';
import CompanyLocation from '@/app/_components/Company/CompanyLocation/CompanyLocation';
import CompanyMainInfo from '@/app/_components/Company/CompanyMainInfo/CompanyMainInfo';
import CompanyOurStory from '@/app/_components/Company/CompanyOurStory/CompanyOurStory';
import CompanyStory from '@/app/_components/Company/CompanyStory/CompanyStory';

import React from 'react';

const CompanyContainer = () => {
  return (
    <div className="w-full mt-80px">
      <CompanyMainInfo />
      <CompanyStory />
      <CompanyStoryMobileSlider />
      <CompanyArticle />
      <CompanyOurStory />
      <CompanyLocation />
    </div>
  );
};

export default CompanyContainer;
