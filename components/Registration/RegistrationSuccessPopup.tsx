'use client';

import { useRegistrationStore } from '@/lib/store';

import { useRouter } from 'next/navigation';

import UIButton from '@/components/common/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function RegistrationSuccessPopup() {
  const router = useRouter();
  const { registered, provider, setRegistrationDefaults } =
    useRegistrationStore((state: any) => state);
  return (
    <Dialog
      open={registered}
      onOpenChange={(e) => {
        setRegistrationDefaults();
        router.push(provider ? '/' : '/sign-in');
      }}
    >
      <DialogContent className="p-8">
        <DialogHeader>
          <DialogTitle className="text-center font-light text-[40px]/[48px] mb-3">
            {provider ? (
              <>
                Your data is being <i className="font-normal">processed!</i>
              </>
            ) : (
              <>
                You are almost <i className="font-normal">there!</i>
              </>
            )}
          </DialogTitle>
          <DialogDescription className="text-center text-[18px]/[26px] text-black mb-8">
            {provider
              ? "We are currently processing the information you provided during registration. Once complete, you will receive an email from us with a link to confirm your account. Please check your inbox, and if you don't see the email, kindly check your spam folder. Thank you for joining us!"
              : "Thank you for registering! We've sent an email to the address you provided during registration. Please check your inbox and click the confirmation link to activate your account. If you don't see the email, please check your spam folder. Happy exploring!"}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-around mt-8">
          <DialogClose asChild>
            <UIButton className="w-[216px]">I got it</UIButton>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
