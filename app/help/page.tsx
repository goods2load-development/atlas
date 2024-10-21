import { Suspense } from "react";
import { Metadata } from "next";
import { type FC, memo } from "react";
import Help from "@/components/Help/Help";
import Footer from "@/components/Footer";
import BigLayout from "@/components/BigLayout";

export const metadata: Metadata = {
  title: "Help",
};

const HelpPage: FC = () => {
  return (
    <>
      <BigLayout
        title="How we can help you?"
        description="Doing business has never been easier."
      >
        <Suspense>
          <Help />
        </Suspense>
      </BigLayout>
      <Footer />
    </>
  );
};

export default memo(HelpPage);
