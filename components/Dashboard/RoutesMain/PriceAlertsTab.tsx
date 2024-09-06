"use client";

import ListItem from "@/components/ui/list-item";
import Pagination from "@/components/ui/pagination";
import Spinner from "@/components/ui/spinner";
import { useToast } from "@/components/ui/use-toast";
import { usePriceAlertsStore } from "@/lib/store";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Reply, TrashIcon } from "lucide-react";
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
  const meta = priceAlerts?.meta;

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

  const sendPriceAlertById = (id: string) => {
    sendPriceAlert(id)
      .then(() => getPriceAlertsForPage(page))
      .then(() =>
        toast({
          title: "Price alert was sended",
          variant: "destructive",
          className: "bg-green-500 text-white",
        })
      );
  };

  const deletePriceAlertById = (id: string) => {
    deletePriceAlert(id)
      .then(() => getPriceAlertsForPage(page))
      .then(() =>
        toast({
          title: "Price Alert deleted.",
          variant: "destructive",
          className: "bg-green-500 text-white",
        })
      );
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
                <p
                  className="hover:underline hover:cursor-pointer"
                  onClick={() =>
                    setIsViewModalOpen({ isOpen: true, id: item.id })
                  }
                >
                  {item.email}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    title="Send"
                    onClick={() => sendPriceAlertById(item.id)}
                  >
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
                    onClick={() => deletePriceAlertById(item.id)}
                  >
                    <TrashIcon />
                  </button>
                </div>
              </div>
            </ListItem>
          ))}
        </div>
        {meta && meta?.pageCount > 1 && (
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
