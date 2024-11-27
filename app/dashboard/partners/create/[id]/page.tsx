import PartnerDataPage from '@/components/PartnersDataPage/PartnerDataPage';

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

  return <PartnerDataPage companyPhoto={companyPhoto} isCreate />;
}
