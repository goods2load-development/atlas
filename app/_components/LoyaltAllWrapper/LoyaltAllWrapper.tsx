import Footer from '@/components/Footer';
import Header, { HeaderVariant } from '@/components/Header/Header';

interface LoyaltAllWrapper {
  children: string | JSX.Element | JSX.Element[];
  headerVariant?: HeaderVariant;
}

export default function LoyaltAllWrapper({
  children,
  headerVariant = 'primary',
}: LoyaltAllWrapper) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
