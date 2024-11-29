'use client';

import { useUserStore } from '@/lib/store';
import { isUserAdmin } from '@/lib/utils';

import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

import UIButton from '@/components/common/Button';
import ConfirmDialog from '@/components/ui/confirm-dialog';

export default function DeleteAccount() {
  const router = useRouter();
  const { deleteUser, user } = useUserStore((state: any) => state);

  const isAdmin = isUserAdmin(user?.role);

  return (
    <ConfirmDialog
      trigger={
        <UIButton
          secondary
          className="text-[#666666] border-[#666666] hover:bg-[#666666] w-full px-8"
        >
          <Trash2 className="w-4 h-4 mr-[6px]" />
          Delete account
        </UIButton>
      }
      title={
        <>
          Confirm <i className="font-normal">Deletion</i>
        </>
      }
      description={
        isAdmin ? (
          <>
            Are you sure you would like to delete this profile from the
            database? <strong>This action cannot be undone.</strong>
          </>
        ) : (
          <>
            Are you sure you would like to delete your profile from the
            platform? <strong>This action cannot be undone.</strong>
          </>
        )
      }
      confirmLabel="Yes, delete"
      cancelLabel="No, keep"
      onConfirm={() => {
        deleteUser(() => router.push('/'));
      }}
    />
  );
}
