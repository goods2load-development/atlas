"use client";
import UIButton from "@/components/common/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { redirect } from "next/navigation";
import { useUserStore } from "@/lib/store";

export default function DeleteAccount() {
  const { deleteUser } = useUserStore((state: any) => state);
  
  return (
    <Dialog>
      <DialogTrigger>
        <UIButton secondary className="text-[#666666] border-[#666666] hover:bg-[#666666] min-w-52">
          <img src="/trash.svg" />
          Delete account
        </UIButton>
      </DialogTrigger>
      <DialogContent className="p-8">
        <DialogHeader>
          <DialogTitle className="text-center font-light text-[40px]/[48px] mb-3">Confirm <i className="font-normal">Deletion</i></DialogTitle>
          <DialogDescription className="text-center text-[18px]/[26px] text-black mb-8">
          Are you sure you would like to delete this profile from the database? <span className="font-semibold">This action cannot be undone.</span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-around mt-8">
          <DialogClose asChild>
            <UIButton secondary className="w-5/12">
              Cancel
            </UIButton>
          </DialogClose>
          <DialogClose asChild className="w-5/12">
            <UIButton onClick={() => {
              deleteUser(() => {
                redirect("/");
              });
            }}>
              Yes, delete my profile
            </UIButton>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
