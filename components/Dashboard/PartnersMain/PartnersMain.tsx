"use client";

import { useEffect, useState } from "react";
import ListItem from "@/components/ui/list-item";
import Spinner from "@/components/ui/spinner";
import { useToast } from "@/components/ui/use-toast";
import { usePartnersStore } from "@/lib/store";
import clsx from "clsx";
import { Check, TrashIcon } from "lucide-react";
import ViewPartnerDialog from "./ViewPartnerDialog";

const PartnersMain = () => {
  const {
    partners,
    isPartnersLoading,
    getPartners,
    approvePartner,
    rejectPartner,
  } = usePartnersStore((state) => state);
  const { toast } = useToast();

  const [isViewModalOpen, setIsViewModalOpen] = useState({
    isOpen: false,
    id: "",
  });

  useEffect(() => {
    getPartners();
  }, []);

  const confirmPartner = (id: string) => {
    approvePartner(id)
      .then(getPartners)
      .then(() =>
        toast({
          title: "Partner successfully confirmed.",
          variant: "destructive",
          className: "bg-green-500",
        })
      );
  };

  const unconfirmPartner = (id: string) => {
    rejectPartner(id)
      .then(getPartners)
      .then(() =>
        toast({
          title: "User rejected.",
          variant: "destructive",
          className: "bg-green-500",
        })
      );
  };

  return (
    <div className="min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[26px] font-[400] text-[#263238] leading-[30px] text-center md:text-left">
          Partners
        </h1>
        {isPartnersLoading && <Spinner />}
      </div>
      <div
        className={clsx({
          "pointer-events-none": isPartnersLoading,
        })}
      >
        <div className={clsx("flex flex-col gap-4")}>
          {!isPartnersLoading && !partners?.length && (
            <p className="font-bold text-red-600">
              There is no any new partners at the moment.
            </p>
          )}
          {partners?.map((partner, i: number) => (
            <ListItem key={i}>
              <div className="flex gap-2 justify-between w-full">
                <p
                  onClick={() =>
                    setIsViewModalOpen({
                      id: partner.id,
                      isOpen: true,
                    })
                  }
                  className="hover:underline hover:cursor-pointer"
                >
                  {partner.email}
                </p>
                <div className="flex items-center gap-2">
                  <ViewPartnerDialog
                    isOpen={
                      isViewModalOpen.id === partner.id &&
                      isViewModalOpen.isOpen
                    }
                    setIsOpen={setIsViewModalOpen}
                    partner={partner}
                  />
                  <button
                    onClick={() => confirmPartner(partner.id)}
                    title="Confirm"
                  >
                    <Check />
                  </button>
                  <button
                    onClick={() => unconfirmPartner(partner.id)}
                    title="Delete"
                  >
                    <TrashIcon />
                  </button>
                </div>
              </div>
            </ListItem>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnersMain;
