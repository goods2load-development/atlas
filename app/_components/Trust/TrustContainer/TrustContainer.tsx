import React from 'react';
import TrustArticle from '@/app/_components/Trust/TrustArticle/TrustArticle';
import TrustReputation from '@/app/_components/Trust/TrustReputation/TrustReputation';
import TrustMap from '@/app/_components/Trust/TrustMap/TrustMap';

const TrustContainer = () => {
  return (
    <div className='w-full flex flex-col items-center'>
      <TrustArticle/>
      <TrustReputation/>
      <TrustMap/>
    </div>
  );
};

export default TrustContainer;
