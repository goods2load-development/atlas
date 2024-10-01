"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import ListItem from "@/components/ui/list-item";
import Spinner from "@/components/ui/spinner";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { usePartnersStore } from "@/lib/store";
import clsx from "clsx";
import { Edit2Icon, FileSymlink, Plus, TrashIcon } from "lucide-react";
import debounce from "lodash/debounce";
import { filterByField } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

const PartnersMain = () => {
  const {
    partners,
    isPartnersLoading,
    getPartnersApproved,
    getPartnersInReview,
    getPartnersNew,
    approvePartner,
    rejectPartner,
  } = usePartnersStore((state) => state);
  const { toast } = useToast();

  const searchParams = useSearchParams();

  const { push } = useRouter();
  const tab = searchParams.get("tab") || "new";
  const [searchValue, setSearchValue] = useState("");
  const filteredPartners = useMemo(
    () =>
      filterByField(
        partners.map((par) => ({
          hasPage: par.hasPage,
          partnerId: par.id,
          ...par.user,
        })),
        "email",
        searchValue
      ),
    [searchValue, partners]
  );

  useEffect(() => {
    getPartners();
  }, [tab]);

  const getPartners = () => {
    if (tab === "new") return getPartnersNew();
    if (tab === "in-review") return getPartnersInReview();
    if (tab === "active") return getPartnersApproved();
  };

  const unconfirmPartner = (id: string) => {
    rejectPartner(id)
      .then(getPartners)
      .then(() =>
        toast({
          title: "User rejected.",
          variant: "destructive",
          className: "bg-green-500",
        })
      );
  };

  const debouncedSetSearchValue = useCallback(
    debounce((value: string) => {
      setSearchValue(value);
    }, 200),
    []
  );

  return (
    <div className="min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[26px] font-[400] text-[#263238] leading-[30px] text-center md:text-left">
          Templates
        </h1>
        {isPartnersLoading && <Spinner />}
      </div>
      <div className="flex justify-between items-center mb-4">
        <Input
          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            debouncedSetSearchValue(e.currentTarget.value)
          }
          className="max-w-[400px]"
          placeholder="Search..."
        />
        <Button onClick={() => push("/dashboard/template/create")}>
          <Plus />
        </Button>
      </div>

      <div
        className={clsx({
          "pointer-events-none": isPartnersLoading,
        })}
      >
        <div className={clsx("flex flex-col gap-4")}>
          {!isPartnersLoading && !partners?.length && (
            <p className="font-bold text-red-600">
              There is no any new partners at the moment.
            </p>
          )}
          {filteredPartners?.map((partner, i: number) => (
            <ListItem key={i}>
              <div className="flex gap-2 justify-between w-full">
                <p className="hover:underline hover:cursor-pointer">
                  {partner.email}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => unconfirmPartner(partner.partnerId)}
                    title="Delete"
                  >
                    <TrashIcon />
                  </button>

                  <button
                    title="visit page"
                    onClick={() => push(`/partner/${partner.partnerId}`)}
                  >
                    <FileSymlink />
                  </button>

                  <button
                    title="edit page"
                    onClick={() =>
                      push(`/dashboard/partners/edit/${partner.partnerId}`)
                    }
                  >
                    <Edit2Icon />
                  </button>
                </div>
              </div>
            </ListItem>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnersMain;
