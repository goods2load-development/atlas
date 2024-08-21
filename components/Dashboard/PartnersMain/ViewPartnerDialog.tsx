"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ViewIcon } from "lucide-react";
import { toNormalText } from "@/lib/utils";
import { Partner } from "./types";
import Link from "next/link";
import Image from "next/image";

const linkFields = [
  "insuranceStatement",
  "issuingAuthority",
  "tradeLicenseNumber",
  "companyPhoto",
];

const ViewPartnerDialog = ({
  isOpen,
  setIsOpen,
  partner,
}: {
  isOpen: boolean;
  setIsOpen: (a: any) => void;
  partner: Partner;
}) => {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isOpen) => {
        setIsOpen({
          isOpen,
          id: isOpen ? partner.id : "",
        });
      }}
    >
      <DialogContent className="p-8">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-2 text-center text-[40px]/[48px] mb-3 uppercase font-bold">
            {partner.companyPhoto && (
              <Image
                width={50}
                height={50}
                src={`${process.env.NEXT_PUBLIC_BASE_URL}${partner.companyPhoto}`}
                alt="logo"
              />
            )}{" "}
            Partner data
          </DialogTitle>
          <hr />
          <div className="max-h-[300px] overflow-y-scroll">
            <div className="flex flex-col gap-2">
              {Object.entries(partner).map(([key, value]) => {
                if (value === null || value === "" || key === "id") return null;
                if (linkFields.includes(key))
                  return (
                    <p key={key}>
                      <strong>{toNormalText(key as string)}: </strong>

                      <Link
                        href={`${process.env.NEXT_PUBLIC_BASE_URL}${value}`}
                        target="_blank"
                        key={key}
                      >
                        {value}
                      </Link>
                    </p>
                  );
                return (
                  <p key={key}>
                    <strong>{toNormalText(key as string)}: </strong>
                    {value?.toString() || "-"}
                  </p>
                );
              })}
            </div>
          </div>
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

export default ViewPartnerDialog;
