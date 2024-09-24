"use client";

import Spinner from "@/components/ui/spinner";
import { useToast } from "@/components/ui/use-toast";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import { useFooterHeaderStore } from "@/lib/store";
import { HeaderFooterData } from "./types";
import { Button } from "@/components/ui/button";
import LinksMenu from "./LinksMenu";

const FooterMain = () => {
  const { toast } = useToast();
  const { footerData, isFooterLoading, getFooterData } = useFooterHeaderStore();
  const [footerDataDynamic, setFooterDataDynamic] =
    useState<HeaderFooterData | null>(footerData);

  const hasAnyChanges = useMemo(() => {
    if (!footerData) return false;

    return JSON.stringify(footerData) !== JSON.stringify(footerDataDynamic);
  }, [footerData, footerDataDynamic]);

  useEffect(() => {
    getFooterData();
  }, []);

  useEffect(() => {
    if (footerData) {
      setFooterDataDynamic(footerData);
    }
  }, [footerData]);

  return (
    <div className="min-h-screen">
      <div className="flex justify-between items-center mb-8 gap-2">
        <h1 className="text-[26px] font-[400] text-[#263238] leading-[30px] text-center md:text-left">
          Footer
        </h1>
        {isFooterLoading && <Spinner />}
        <Button
          disabled={isFooterLoading || !hasAnyChanges}
          className="ml-auto"
        >
          Update
        </Button>
      </div>

      <div
        className={clsx("flex flex-col gap-4", {
          "pointer-events-none": isFooterLoading,
        })}
      >
        {footerDataDynamic?.json?.length && (
          <LinksMenu data={footerDataDynamic} setData={setFooterDataDynamic} />
        )}
      </div>
    </div>
  );
};

export default FooterMain;
