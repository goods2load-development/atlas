import dynamic from 'next/dynamic';

import PartnerDataPage from '@/components/PartnersDataPage/PartnerDataPage';

const PartnerDataPageLazy = dynamic(
  () => import('@/components/PartnersDataPage/PartnerDataPage'),
  {
    ssr: false,
  },
);

export default async function CreatePartnerPage({
  params,
}: {
  params: { id: string };
}) {
  const {
    user: { companyPhoto },
  } = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/partners/${params.id}`,
      {
        cache: 'no-store',
      },
    )
  ).json();

  return <PartnerDataPageLazy companyPhoto={companyPhoto} isCreate />;
}
