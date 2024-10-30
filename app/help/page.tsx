import { type FC, memo } from 'react';
import { Suspense } from 'react';

import { Metadata } from 'next';

import BigLayout from '@/components/BigLayout';
import Footer from '@/components/Footer';
import Help from '@/components/Help/Help';

export const metadata: Metadata = {
  title: 'Help',
};

const HelpPage: FC = () => {
  return (
    <>
      <BigLayout
        title="How we can help you?"
        description="Doing business has never been easier."
      >
        <Suspense>
          <Help />
        </Suspense>
      </BigLayout>
      <Footer />
    </>
  );
};

export default memo(HelpPage);
