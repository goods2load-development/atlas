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
import { BlogComment } from "./types";
import { format } from "date-fns";
import Link from "next/link";

const linkFields = [
  "insuranceStatement",
  "issuingAuthority",
  "tradeLicenseNumber",
  "companyPhoto",
];

const ViewCommentDialog = ({ comment }: { comment: BlogComment }) => {
  return (
    <Dialog>
      <DialogContent className="p-8">
        <DialogHeader>
          <DialogTitle className="text-center text-[40px]/[48px] mb-3 uppercase font-bold">
            Comment data
          </DialogTitle>
          <hr />
          <div className="max-h-[300px] overflow-y-scroll">
            <h2 className="font-bold text-xl my-4">Comment data</h2>
            <div className="flex flex-col gap-2">
              {Object.entries(comment).map(([key, val]) => {
                if (["id", "userId", "user"].includes(key)) return null;

                const value = key === "date" ? format(val, "MM/dd/yyyy") : val;

                return (
                  <p key={key}>
                    <strong>{toNormalText(key as string)}: </strong>
                    {value?.toString() || "-"}
                  </p>
                );
              })}
            </div>
            <hr className="mt-2" />
            <h2 className="font-bold text-xl my-4">User data</h2>
            <div className="flex flex-col gap-2">
              {Object.entries(comment.user).map(([key, value]) => {
                if (!value) return null;
                if (linkFields.includes(key))
                  return (
                    <p key={key}>
                      <strong>{toNormalText(key as string)}: </strong>

                      <Link
                        href={`${process.env.NEXT_PUBLIC_BASE_URL}${value}`}
                        target="_blank"
                        key={key}
                      >
                        {value.toString()}
                      </Link>
                    </p>
                  );
                return (
                  <p key={key}>
                    <strong>{toNormalText(key)}: </strong>
                    {value.toString()}
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

export default ViewCommentDialog;
