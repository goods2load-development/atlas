import { redirect } from 'next/navigation';

import PartnerDataPage from '@/components/PartnersDataPage/PartnerDataPage';

export default async function EditPartnerPage({
  params,
}: {
  params: { id: string };
}) {
  const [
    partnerData,
    {
      user: { companyPhoto },
    },
  ] = await Promise.all([
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/partners/${params.id}/information`,
      {
        cache: 'no-store',
      },
    ).then((res) => res.json()),
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/partners/${params.id}`, {
      cache: 'no-store',
    }).then((res) => res.json()),
  ]);

  if (!partnerData.hasPage) {
    redirect('/');
  }

  return (
    <PartnerDataPage
      companyPhoto={companyPhoto}
      partnerData={partnerData}
      isEdit
    />
  );
}
