import HeaderClient from "@/components/Header/HeaderClient";

import Catalogue from "@/components/Catalogue/Catalogue";
import DynamicMenu from "@/components/Header/DynamicMenu";
import Footer from "@/components/Footer";

export default function CataloguePage() {
  return (
    <>
      <HeaderClient />
      <DynamicMenu />
      <Catalogue />
      <Footer />
    </>
  );
}
