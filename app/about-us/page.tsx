import LoyaltAllWrapper from '../_components/LoyaltAllWrapper/LoyaltAllWrapper';
import { generateDefaultMetadata } from '@/lib/metadataUtils';

import { Suspense } from 'react';

import { Metadata } from 'next';

import AboutUs from '@/components/AboutUs/AboutUs';
import BigLayout from '@/components/BigLayout';

export const generateMetadata = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}): Metadata => {
  const data: Record<string, { title: string; description: string }> = {
    company: {
      title:
        'About Us - GOODS2LOAD | Revolutionizing Global Logistics with Innovation and Sustainability',
      description:
        'Founded in 2022, GOODS2LOAD is transforming logistics with a digital-first approach. Serving over 311 SMEs across Europe and expanding globally, we offer innovative, eco-friendly solutions to optimize time, cost, and service efficiency.',
    },
    trust: {
      title:
        'Trust - GOODS2LOAD | Committed to Customer Satisfaction and Continuous Improvement',
      description:
        'At GOODS2LOAD, we prioritize your feedback to enhance our services. We are dedicated to reducing costs, boosting efficiency, and improving customer satisfaction. Your input helps us maintain the highest standards of service and support.',
    },
    media: {
      title: 'Media - GOODS2LOAD | Latest News and Press Releases',
      description:
        'Stay updated with the latest news, press releases, and media coverage about GOODS2LOAD. Learn how we’re revolutionizing logistics with innovative solutions and driving industry change across the globe.',
    },
  };

  const key = Object.keys(searchParams)?.[0];

  const description = data?.[key]?.description || data.company.description;
  const title = data?.[key]?.title || data.company.title;
  const defaultMetadata = generateDefaultMetadata();

  const canonical = key
    ? `${process.env.NEXT_PUBLIC_CLIENT_URL}/about-us?${key}`
    : `${process.env.NEXT_PUBLIC_CLIENT_URL}/about-us`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      ...defaultMetadata.openGraph,
      title,
      description,
      url: canonical,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title,
      description,
    },
  };
};

export default function AboutUsPage() {
  return (
    <LoyaltAllWrapper>
      <BigLayout
        title="About us"
        description="We help reduce costs, increase efficiency and offer improved customer service Company Trust"
      >
        <Suspense>
          <AboutUs />
        </Suspense>
      </BigLayout>
    </LoyaltAllWrapper>
  );
}
