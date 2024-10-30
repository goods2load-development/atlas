import TrustArticle from '@/app/_components/Trust/TrustArticle/TrustArticle';
import TrustMap from '@/app/_components/Trust/TrustMap/TrustMap';
import TrustReputation from '@/app/_components/Trust/TrustReputation/TrustReputation';

import React from 'react';

const TrustContainer = () => {
  return (
    <div className="w-full flex flex-col items-center inset-0">
      <TrustArticle />
      <TrustReputation />
      <TrustMap />
    </div>
  );
};

export default TrustContainer;
