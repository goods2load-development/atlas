import Catalogue from '@/components/Catalogue/Catalogue';
import Footer from '@/components/Footer';
import DynamicMenu from '@/components/Header/DynamicMenu';
import HeaderClient from '@/components/Header/HeaderClient';

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
