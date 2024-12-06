import { redirect } from 'next/navigation';

import BigLayout from '@/components/BigLayout';
import Footer from '@/components/Footer';
import PartnerDataPage from '@/components/PartnersDataPage/PartnerDataPage';

const Partner = async ({ params }: { params: { id: string } }) => {
  const [partnerData] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/partners/information`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ slug: params.id }),
      cache: 'no-store',
    }).then((res) => res.json()),
  ]);

  if (!partnerData.hasPage) {
    redirect('/');
  }
  const url = `https://maps.googleapis.com/maps/api/place/details/json?fields=name%2Crating%2Creviews%2Curl%2Cuser_ratings_total&rating=5&place_id=${partnerData.placementId}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`;
  const placeInfo = await (
    await fetch(url, {
      cache: 'no-store',
    })
  ).json();

  return (
    <>
      <BigLayout title={partnerData.name}>
        <PartnerDataPage
          placeInfo={placeInfo}
          companyPhoto={partnerData.photo}
          partnerData={partnerData}
        />
      </BigLayout>
      <Footer />
    </>
  );
};

export default Partner;
