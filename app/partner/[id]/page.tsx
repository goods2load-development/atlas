import PartnerDataPage from "@/components/PartnersDataPage/PartnerDataPage";
import { redirect } from "next/navigation";

const Partner = async ({ params }: { params: { id: string } }) => {
  const [
    partnerData,
    {
      user: { companyPhoto },
    },
  ] = await Promise.all([
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/partners/${params.id}/information`,
      {
        cache: "no-store",
      }
    ).then((res) => res.json()),
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/partners/${params.id}`, {
      cache: "no-store",
    }).then((res) => res.json()),
  ]);

  if (!partnerData.hasPage) {
    redirect("/");
  }

  const testPlaceId = "ChIJMXnW227dOkcRW3Iy-GVzF_k";
  const url = `https://maps.googleapis.com/maps/api/place/details/json?fields=name%2Crating%2Creviews%2Curl%2Cuser_ratings_total&rating=5&place_id=${testPlaceId}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`;
  const placeInfo = await (
    await fetch(url, {
      cache: "no-store",
    })
  ).json();

  return (
    <PartnerDataPage
      placeInfo={placeInfo}
      companyPhoto={companyPhoto}
      partnerData={partnerData}
    />
  );
};

export default Partner;
