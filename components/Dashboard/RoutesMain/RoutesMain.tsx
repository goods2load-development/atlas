"use client";

import { useEffect } from "react";
import ListItem from "@/components/ui/list-item";
import Pagination from "@/components/ui/pagination";
import Spinner from "@/components/ui/spinner";
import { useToast } from "@/components/ui/use-toast";
import { useRoutesStore } from "@/lib/store";
import clsx from "clsx";
import { Check, CircleX, TrashIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ReplyDialog from "./ReplyDialog";
import ViewDialog from "./ViewDialog";

const TAKE = 5;

const RoutesMain = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const page = Number(searchParams.get("page") || 1);
  const {
    routes,
    isRoutesLoading,
    getRoutes,
    deleteRoute,
    applyRoute,
    replyRoute,
  } = useRoutesStore((state: any) => state);
  const { toast } = useToast();

  const { meta } = routes;

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
          title: "Route deleted.",
          variant: "destructive",
          className: "bg-green-500",
        })
      );
  };

  const applyRouteById = (id: string) => {
    applyRoute(id)
      .then(() => getRoutesForPage(page))
      .then(() =>
        toast({
          title: "Route applied.",
          variant: "destructive",
          className: "bg-green-500",
        })
      );
  };

  const replyRouteById = (
    id: string,
    data: {
      message: string;
      reasons?: string[];
    }
  ) => {
    return replyRoute(id, data)
      .then(() => getRoutesForPage(page))
      .then(() =>
        toast({
          title: "Route applied.",
          variant: "destructive",
          className: "bg-green-500",
        })
      );
  };

  const handleSetPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    if (page) {
      params.set("page", page.toString());
    } else {
      params.delete("page");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[26px] font-[400] text-[#263238] leading-[30px] text-center md:text-left">
          Routes
        </h1>
        {isRoutesLoading && <Spinner />}
      </div>
      <div
        className={clsx({
          "pointer-events-none": isRoutesLoading,
        })}
      >
        <div className={clsx("flex flex-col gap-4")}>
          {routes?.data?.map(({ order, user, id }: any, i: number) => (
            <ListItem key={i}>
              <div className="flex gap-2 justify-between w-full">
                <p>{user.email}</p>
                <div className="flex items-center gap-1">
                  <button onClick={() => applyRouteById(id)} title="Approve">
                    <Check />
                  </button>
                  <button title="Delete">
                    <ReplyDialog
                      onSubmitCallback={(data: any) => replyRouteById(id, data)}
                      order={order}
                    />
                  </button>
                  <ViewDialog user={user} order={order} />
                  <button onClick={() => deleteRouteById(id)} title="Delete">
                    <TrashIcon />
                  </button>
                </div>
              </div>
            </ListItem>
          ))}
        </div>
        {meta && (
          <Pagination
            page={page}
            total={meta.pageCount}
            onPageChange={(newPage) => handleSetPage(newPage)}
          />
        )}
      </div>
    </div>
  );
};

export default RoutesMain;
