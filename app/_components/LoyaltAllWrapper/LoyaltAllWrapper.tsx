import Header, { HeaderVariant } from "@/components/Header";
import Footer from "@/components/Footer";

interface LoyaltAllWrapper {
  children: string | JSX.Element | JSX.Element[];
  headerVariant?: HeaderVariant;
}

export default function LoyaltAllWrapper({
  children,
  headerVariant = "primary",
}: LoyaltAllWrapper) {
  return (
    <>
      <Header variant={headerVariant} />
      {children}
      <Footer />
    </>
  );
}
