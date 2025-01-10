'use client';

import ViewDialogQuotation from './ViewDialogQuotations';
import { useQuotationsStore } from '@/lib/store';

import { useEffect, useState } from 'react';

import clsx from 'clsx';
import { Check, TrashIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import ConfirmDialog from '@/components/ui/confirm-dialog';
import ListItem from '@/components/ui/list-item';
import Pagination from '@/components/ui/pagination';
import { useToast } from '@/components/ui/use-toast';

const TAKE = 5;

export const FreeQuotationsTab = () => {
  const [isViewModalOpen, setIsViewModalOpen] = useState({
    isOpen: false,
    id: '',
  });

  const {
    isQuotationsLoading,
    quotations,
    getQuotations,
    approveQuotation,
    rejectQuotation,
  } = useQuotationsStore();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const { toast } = useToast();

  const page = Number(searchParams.get('quotationsPage') || 1);
  const meta = quotations?.meta;

  useEffect(() => {
    getQuotationsPerPage(page);
  }, [page]);

  const getQuotationsPerPage = (page: number) => {
    getQuotations({
      page,
      take: TAKE,
    });
  };

  const handleSetPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    if (page) {
      params.set('quotationsPage', page.toString());
    } else {
      params.delete('quotationsPage');
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const handleApprove = (id: string) => {
    approveQuotation(id)
      .then(() => getQuotationsPerPage(page))
      .then(() =>
        toast({
          title: 'Quotation has been approved',
          variant: 'destructive',
          className: 'bg-green-500 text-white',
        }),
      );
  };

  const handleReject = (id: string) => {
    rejectQuotation(id)
      .then(() => getQuotationsPerPage(page))
      .then(() =>
        toast({
          title: 'Quotation has been deleted.',
          variant: 'destructive',
          className: 'bg-green-500 text-white',
        }),
      );
  };

  return (
    <>
      <div
        className={clsx({
          'pointer-events-none': isQuotationsLoading,
        })}
      >
        <div className={clsx('flex flex-col gap-4')}>
          {!isQuotationsLoading && !quotations?.data?.length && (
            <p className="font-bold text-red-600">
              No quotation requests at the moment
            </p>
          )}
          {quotations?.data?.map((item, i: number) => (
            <ListItem key={i}>
              <div className="flex gap-2 justify-between w-full">
                <p
                  className="hover:underline hover:cursor-pointer"
                  onClick={() =>
                    setIsViewModalOpen({
                      isOpen: true,
                      id: item.id,
                    })
                  }
                >
                  {item.email || item.phone}
                </p>
                <div className="flex items-center gap-2">
                  <ViewDialogQuotation
                    isOpen={
                      isViewModalOpen.id === item.id && isViewModalOpen.isOpen
                    }
                    setIsOpen={setIsViewModalOpen}
                    item={item}
                    id={item.id}
                  />
                  <button
                    title="approve"
                    onClick={() => handleApprove(item.id)}
                  >
                    <Check />
                  </button>

                  <ConfirmDialog
                    trigger={
                      <button title="reject">
                        <TrashIcon />
                      </button>
                    }
                    title="Confirm Rejection"
                    description="Are you sure you want to reject this quotation? This action cannot be undone."
                    confirmLabel="Yes, reject"
                    cancelLabel="No, cancel"
                    onConfirm={() => handleReject(item.id)}
                  />
                </div>
              </div>
            </ListItem>
          ))}
        </div>
        {meta && meta?.pageCount > 1 && (
          <Pagination
            page={page}
            total={meta.pageCount}
            onPageChange={(newPage) => handleSetPage(newPage)}
          />
        )}
      </div>
    </>
  );
};
