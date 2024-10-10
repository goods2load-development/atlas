import { Suspense } from "react";
import { Metadata } from "next";
import { type FC, memo } from "react";
import Help from "@/components/Help/Help";
import LoyaltAllWrapper from "../_components/LoyaltAllWrapper/LoyaltAllWrapper";

export const metadata: Metadata = {
  title: "Help",
};

const HelpPage: FC = () => {
  return (
    <LoyaltAllWrapper>
      <Suspense>
        <Help />
      </Suspense>
    </LoyaltAllWrapper>
  );
};

export default memo(HelpPage);
