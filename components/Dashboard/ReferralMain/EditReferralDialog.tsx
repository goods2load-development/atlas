"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import ReferralFormDialog from "./ReferralFormDialog";
import { Pencil } from "lucide-react";
import { ReferralItemType } from "./types";

const EditReferralDialog = ({
  referralItem,
  editReferral,
}: {
  referralItem: ReferralItemType;
  editReferral: (oldData: any, data: any, id: string) => void;
}) => {
  const { title, url, picture, id } = referralItem;

  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = (data: any) => {
    editReferral(referralItem, data, id);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent onCloseClick={() => setIsOpen(false)} className="p-8">
        <DialogHeader>
          <DialogTitle className="text-center text-[40px]/[48px] mb-3 uppercase font-bold">
            Edit referral {title}
          </DialogTitle>
        </DialogHeader>
        <ReferralFormDialog
          defaultValues={{
            title,
            url,
            picture,
          }}
          onSubmitCallback={onSubmit}
        />
      </DialogContent>
      <DialogTrigger asChild>
        <button onClick={() => setIsOpen(true)} title="Edit">
          <Pencil />
        </button>
      </DialogTrigger>
    </Dialog>
  );
};

export default EditReferralDialog;
