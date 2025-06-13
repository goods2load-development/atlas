'use client';

import ReplyDialog from './ReplyDialog';
import ViewDialog from './ViewDialog';
import { useRoutesStore } from '@/lib/store';

import { useEffect, useState } from 'react';

import clsx from 'clsx';
import { Check, TrashIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import ConfirmDialog from '@/components/ui/confirm-dialog';
import ListItem from '@/components/ui/list-item';
import Pagination from '@/components/ui/pagination';
import { useToast } from '@/components/ui/use-toast';

const TAKE = 5;

export const RoutesTab = () => {
  const {
    routes,
    isRoutesLoading,
    getRoutes,
    deleteRoute,
    applyRoute,
    rejectRoute,
  } = useRoutesStore((state: any) => state);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const { toast } = useToast();

  const page = Number(searchParams.get('routesPage') || 1);
  const { meta } = routes;

  const [isViewModalOpen, setIsViewModalOpen] = useState({
    isOpen: false,
    id: '',
  });

  useEffect(() => {
    getRoutesForPage(page);
  }, [page]);

  const getRoutesForPage = (page: number) =>
    getRoutes({
      page,
      take: TAKE,
    });

  const deleteRouteById = (id: string) => {
    deleteRoute(id)
      .then(() => getRoutesForPage(page))
      .then(() =>
        toast({
          title: 'Route deleted.',
          variant: 'destructive',
          className: 'bg-green-500',
        }),
      );
  };

  const applyRouteById = (id: string) => {
    applyRoute(id)
      .then(() => getRoutesForPage(page))
      .then(() =>
        toast({
          title: 'Route approved. All data sent to provider.',
          variant: 'destructive',
          className: 'bg-green-500',
        }),
      );
  };

  const rejectRouteById = (
    id: string,
    data: {
      message: string;
      reasons?: string[];
    },
  ) => {
    return rejectRoute(id, data)
      .then(() => getRoutesForPage(page))
      .then(() =>
        toast({
          title: 'Reply sent.',
          variant: 'destructive',
          className: 'bg-green-500',
        }),
      );
  };

  const handleSetPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    if (page) {
      params.set('routesPage', page.toString());
    } else {
      params.delete('routesPage');
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div
      className={clsx({
        'pointer-events-none': isRoutesLoading,
      })}
    >
      <div className={clsx('flex flex-col gap-4')}>
        {!isRoutesLoading && !routes?.data?.length && (
          <p className="font-bold text-red-600">
            No routes selected at the moment
          </p>
        )}
        {routes?.data?.map(({ id, ...route }: any, i: number) => (
          <ListItem key={i}>
            <div className="flex gap-2 justify-between w-full">
              <p
                onClick={() =>
                  setIsViewModalOpen({
                    id,
                    isOpen: true,
                  })
                }
                className="hover:underline hover:cursor-pointer"
              >
                {route.userEmail}
              </p>
              <div className="flex items-center gap-2">
                <button onClick={() => applyRouteById(id)} title="Approve">
                  <Check />
                </button>
                <button title="Reply">
                  <ReplyDialog
                    onSubmitCallback={(data: any) => rejectRouteById(id, data)}
                    order={route}
                  />
                </button>
                <ViewDialog
                  isOpen={isViewModalOpen.id === id && isViewModalOpen.isOpen}
                  setIsOpen={setIsViewModalOpen}
                  route={route}
                  id={id}
                />
                <ConfirmDialog
                  trigger={
                    <button title="Delete">
                      <TrashIcon />
                    </button>
                  }
                  title="Confirm Deletion"
                  description="Are you sure you want to delete this route? This action cannot be undone."
                  confirmLabel="Yes, delete"
                  cancelLabel="No, cancel"
                  onConfirm={() => deleteRouteById(id)}
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
  );
};
