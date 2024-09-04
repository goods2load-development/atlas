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
            <div className="flex flex-col gap-2">
              {Object.entries(comment).map(([key, val]) => {
                if (["id"].includes(key)) return null;

                const value = key === "date" ? format(val, "MM/dd/yyyy") : val;

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

export default ViewCommentDialog;
