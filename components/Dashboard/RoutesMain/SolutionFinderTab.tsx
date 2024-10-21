"use client";

import ListItem from "@/components/ui/list-item";
import Pagination from "@/components/ui/pagination";
import { useToast } from "@/components/ui/use-toast";
import { usePriceAlertsStore } from "@/lib/store";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Check, TrashIcon } from "lucide-react";
import ViewDialogPriceAlert from "./ViewDilogPriceAlert";
import PriceAlertReplyDialog from "./PriceAlertReplyDialog";

const TAKE = 5;

export const SolutionFinderTab = () => {
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
    replyPriceAlerts,
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

  const replyPriceAlertsById = (id: string, message: string) => {
    return replyPriceAlerts(id, message)
      .then(() => getPriceAlertsForPage(page))
      .then(() =>
        toast({
          title: "Reply sent.",
          variant: "destructive",
          className: "bg-green-500",
        })
      );
  };

  return (
    <>
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
                  {item.email || item.phoneNumber}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    title="Send"
                    onClick={() => sendPriceAlertById(item.id)}
                  >
                    <Check />
                  </button>
                  <button title="Reply">
                    <PriceAlertReplyDialog
                      onSubmitCallback={(data: any) =>
                        replyPriceAlertsById(item.id, data.message)
                      }
                    />
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
