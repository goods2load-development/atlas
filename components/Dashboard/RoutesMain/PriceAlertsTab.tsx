"use client";

import ListItem from "@/components/ui/list-item";
import Pagination from "@/components/ui/pagination";
import Spinner from "@/components/ui/spinner";
import { useToast } from "@/components/ui/use-toast";
import { usePriceAlertsStore, useRoutesStore } from "@/lib/store";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Brush, Reply, TrashIcon } from "lucide-react";
import ReplyDialog from "./ReplyDialog";
import ViewDialog from "./ViewDialog";
import ViewDialogPriceAlert from "./ViewDilogPriceAlert";

const TAKE = 5;

export const PriceAlertTab = () => {
  const [isViewModalOpen, setIsViewModalOpen] = useState({
    isOpen: false,
    id: "",
  });

  const {
    priceAlerts,
    isPriceAlertLoading,
    getPriceAlerts,
    deletePriceAlert,
    sendPriceAlert,
  } = usePriceAlertsStore((state: any) => state);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const { toast } = useToast();

  const page = Number(searchParams.get("priceAlertPage") || 1);
  const { meta } = priceAlerts;

  useEffect(() => {
    getPriceAlertsForPage(page);
  }, [page]);

  const getPriceAlertsForPage = (page: number) => {
    getPriceAlerts({
      page,
      take: TAKE,
    });
  };

  const handleSetPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    if (page) {
      params.set("priceAlertPage", page.toString());
    } else {
      params.delete("priceAlertPage");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      {isPriceAlertLoading && <Spinner />}
      <div
        className={clsx({
          "pointer-events-none": isPriceAlertLoading,
        })}
      >
        <div className={clsx("flex flex-col gap-4")}>
          {!isPriceAlertLoading && !priceAlerts?.data?.length && (
            <p className="font-bold text-red-600">
              There is no any routes at the moment
            </p>
          )}
          {priceAlerts?.data?.map((item: any, i: number) => (
            <ListItem key={i}>
              <div className="flex gap-2 justify-between w-full">
                <p className="hover:underline hover:cursor-pointer">
                  {item.email}
                </p>
                <div className="flex items-center gap-2">
                  <button title="Send" onClick={() => sendPriceAlert(item.id)}>
                    <Reply />
                  </button>
                  <ViewDialogPriceAlert
                    isOpen={
                      isViewModalOpen.id === item.id && isViewModalOpen.isOpen
                    }
                    setIsOpen={setIsViewModalOpen}
                    item={item}
                    id={item.id}
                  />

                  <button
                    title="Delete"
                    onClick={() => deletePriceAlert(item.id)}
                  >
                    <TrashIcon />
                  </button>
                </div>
              </div>
            </ListItem>
          ))}
        </div>
        {meta && meta?.pageCount > TAKE && (
          <Pagination
            page={page}
            total={meta.pageCount}
            onPageChange={(newPage) => handleSetPage(newPage)}
          />
        )}
      </div>
    </>
  );
};
