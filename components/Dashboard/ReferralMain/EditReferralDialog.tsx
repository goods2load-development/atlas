"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as z from "zod";
import { useState } from "react";
import ReferralFormDialog from "./ReferralFormDialog";
import { Pencil } from "lucide-react";
import { ReferralItemType } from "./types";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  link: z.string().url("Enter a valid URL"),
  banner: z
    .instanceof(FileList)
    .refine((files) => files.length === 1, "You need to provide a file")
    .refine(
      (files) => files[0].size <= 2000000,
      "The file is too large, it should be less than 2MB"
    ),
});

const EditReferralDialog = ({
  referralItem,
}: {
  referralItem: ReferralItemType;
}) => {
  const { title, url, id } = referralItem;

  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // addNewReferral(data);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen}>
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
