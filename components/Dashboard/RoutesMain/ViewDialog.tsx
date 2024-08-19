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

const listOfUserData = [
  "companyName",
  "phoneNumber",
  "email",
  "address",
  "country",
  "postalCode",
];

const ViewDialog = ({
  user,
  order,
}: {
  user: UserRoute;
  order: OrderRoute;
}) => {
  return (
    <Dialog>
      <DialogContent className="p-8">
        <DialogHeader>
          <DialogTitle className="text-center text-[40px]/[48px] mb-3 uppercase font-bold">
            View
          </DialogTitle>
          <hr />
          <div className="max-h-[300px] overflow-y-scroll">
            <h2 className="font-bold text-xl my-4">User data</h2>
            <div className="flex flex-col gap-2">
              {Object.entries(user).map(([key, value]) => {
                if (!value || !listOfUserData.includes(key)) return null;
                return (
                  <p key={key}>
                    <strong>{key}: </strong>
                    {value.toString()}
                  </p>
                );
              })}
            </div>
            <hr className="block mt-4" />
            <h2 className="font-bold text-xl my-4">Order data</h2>
            <div className="flex flex-col gap-2">
              {Object.entries(order).map(([key, value]) => {
                if (!value) return null;
                return (
                  <p key={key}>
                    <strong>{key}: </strong>
                    {value.toString()}
                  </p>
                );
              })}
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
      <DialogTrigger asChild>
        <button title="Edit">
          <ViewIcon />
        </button>
      </DialogTrigger>
    </Dialog>
  );
};

export default ViewDialog;
