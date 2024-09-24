"use client";

import Spinner from "@/components/ui/spinner";
import { useToast } from "@/components/ui/use-toast";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import { useFooterHeaderStore } from "@/lib/store";
import { HeaderFooterData } from "./types";
import { Button } from "@/components/ui/button";
import LinksMenu from "./LinksMenu";

const HeaderMain = () => {
  const { toast } = useToast();
  const { headerData, isHeaderLoading, getHeaderData } = useFooterHeaderStore();
  const [headerDataDynamic, setHeaderDataDynamic] =
    useState<HeaderFooterData | null>(headerData);

  const hasAnyChanges = useMemo(() => {
    if (!headerData) return false;

    return JSON.stringify(headerData) !== JSON.stringify(headerDataDynamic);
  }, [headerData, headerDataDynamic]);

  useEffect(() => {
    getHeaderData();
  }, []);

  useEffect(() => {
    if (headerData) {
      setHeaderDataDynamic(headerData);
    }
  }, [headerData]);

  return (
    <div className="min-h-screen">
      <div className="flex justify-between items-center mb-8 gap-2">
        <h1 className="text-[26px] font-[400] text-[#263238] leading-[30px] text-center md:text-left">
          Header
        </h1>
        {isHeaderLoading && <Spinner />}
        <Button
          disabled={isHeaderLoading || !hasAnyChanges}
          className="ml-auto"
        >
          Update
        </Button>
      </div>

      <div
        className={clsx("flex flex-col gap-4", {
          "pointer-events-none": isHeaderLoading,
        })}
      >
        {headerDataDynamic?.json?.length && (
          <LinksMenu data={headerDataDynamic} setData={setHeaderDataDynamic} />
        )}
      </div>
    </div>
  );
};

export default HeaderMain;
