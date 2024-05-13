import { Suspense } from "react";
import { type FC, memo } from "react";
import Help from "@/components/Help/Help";
import LoyaltAllWrapper from "../_components/LoyaltAllWrapper/LoyaltAllWrapper";

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
