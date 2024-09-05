"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ViewIcon } from "lucide-react";
import { OrderRoute, UserRoute } from "./types";
import { countVolume, toNormalText } from "@/lib/utils";
import { useMemo } from "react";
import { format } from "date-fns";
import { dateValues } from "./constants";

const listOfUserData = [
  "companyName",
  "phoneNumber",
  "email",
  "address",
  "country",
  "postalCode",
];

const ViewDialogPriceAlert = ({
  isOpen,
  setIsOpen,
  item,
  id,
}: {
  isOpen: boolean;
  setIsOpen: (a: any) => void;
  item: any;
  id: string;
}) => {
  const volume = useMemo(
    () => countVolume(item.width, item.length, item.height),
    [item]
  );

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isOpen) => {
        setIsOpen({
          isOpen,
          id: isOpen ? id : "",
        });
      }}
    >
      <DialogContent className="p-8">
        <DialogHeader>
          <DialogTitle className="text-center text-[40px]/[48px] mb-3 uppercase font-bold">
            Desire route
          </DialogTitle>
          <hr />
        </DialogHeader>
      </DialogContent>
      <DialogTrigger asChild>
        <button title="View">
          <ViewIcon />
        </button>
      </DialogTrigger>
    </Dialog>
  );
};

export default ViewDialogPriceAlert;
