import { Metadata } from "next";
import CareerForm from "../_components/Career/CareerForm/CareerForm";
import { JoinOurTeam } from "../_components/Career/JoinOurTeam/JoinOurTeam";

import LoyaltAllWrapper from "../_components/LoyaltAllWrapper/LoyaltAllWrapper";
import Footer from "@/components/Footer";
import HeaderClient from "@/components/Header/HeaderClient";
import DynamicMenu from "@/components/Header/DynamicMenu";

export const metadata: Metadata = {
  title: "Career",
};

const Career = () => {
  return (
    <>
      <HeaderClient />
      <DynamicMenu />
      <section className="max-w-[1440px] w-full justify-center items-center gap-[40px] py-[40px] sm:py-[104px] px-5 m-auto">
        <JoinOurTeam />
        <CareerForm />
      </section>
      <Footer />
    </>
  );
};

export default Career;
