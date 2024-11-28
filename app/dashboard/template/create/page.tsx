import dynamic from 'next/dynamic';

import Footer from '@/components/Footer';
import SeoPageMain from '@/components/SeoPage/SeoPageMain';

const SeoPageMainLazy = dynamic(
  () => import('@/components/SeoPage/SeoPageMain'),
  {
    ssr: false,
  },
);

export default async function SeoPage() {
  return (
    <>
      <SeoPageMainLazy type="create" />
      <Footer />
    </>
  );
}
