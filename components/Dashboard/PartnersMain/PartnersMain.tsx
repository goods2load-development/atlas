"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import ListItem from "@/components/ui/list-item";
import Spinner from "@/components/ui/spinner";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { usePartnersStore } from "@/lib/store";
import clsx from "clsx";
import { Check, FilePlus, TrashIcon } from "lucide-react";
import ViewPartnerDialog from "./ViewPartnerDialog";
import debounce from "lodash/debounce";
import { filterByField } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ReplyPartnerDialog from "./ReplyPartnerDialog";

const PartnersMain = () => {
  const {
    partners,
    isPartnersLoading,
    getPartnersApproved,
    getPartnersInReview,
    getPartnersNew,
    approvePartner,
    rejectPartner,
    replyPartner,
  } = usePartnersStore((state) => state);
  const { toast } = useToast();

  const [isViewModalOpen, setIsViewModalOpen] = useState({
    isOpen: false,
    id: "",
  });
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace, push } = useRouter();
  const tab = searchParams.get("tab") || "new";
  const [searchValue, setSearchValue] = useState("");
  const filteredPartners = useMemo(
    () =>
      filterByField(
        partners.map((par) => ({ partnerId: par.id, ...par.user })),
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

  const handleSetTab = (tab: string) => {
    const params = new URLSearchParams(searchParams);
    if (tab) {
      params.set("tab", tab);
    } else {
      params.delete("tab");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const confirmPartner = (id: string) => {
    approvePartner(id)
      .then(getPartners)
      .then(() =>
        toast({
          title: "Partner successfully confirmed.",
          variant: "destructive",
          className: "bg-green-500",
        })
      );
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

  const replyPartnerById = (id: string, message: string) => {
    return replyPartner(id, message)
      .then(getPartners)
      .then(() =>
        toast({
          title: "Reply sent.",
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
          Partners
        </h1>
        {isPartnersLoading && <Spinner />}
      </div>
      <Input
        onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
          debouncedSetSearchValue(e.currentTarget.value)
        }
        className="max-w-[400px] mb-4"
        placeholder="Search..."
      />
      <Tabs onValueChange={handleSetTab} value={tab} className="w-full mx-auto">
        <TabsList className="grid w-[290px] grid-cols-3 mx-auto mb-[28px]">
          <TabsTrigger
            className={`data-[state="active"]:bg-orangeSecondary border-b-2 data-[state="active"]:border-orangePrimary rounded-none`}
            value="new"
          >
            New
          </TabsTrigger>
          <TabsTrigger
            value="in-review"
            className={`data-[state="active"]:bg-orangeSecondary border-b-2 data-[state="active"]:border-orangePrimary rounded-none`}
          >
            In review
          </TabsTrigger>
          <TabsTrigger
            value="active"
            className={`data-[state="active"]:bg-orangeSecondary border-b-2 data-[state="active"]:border-orangePrimary rounded-none`}
          >
            Active
          </TabsTrigger>
        </TabsList>
      </Tabs>
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
                <p
                  onClick={() =>
                    setIsViewModalOpen({
                      id: partner.id,
                      isOpen: true,
                    })
                  }
                  className="hover:underline hover:cursor-pointer"
                >
                  {partner.email}
                </p>
                <div className="flex items-center gap-2">
                  <ViewPartnerDialog
                    isOpen={
                      isViewModalOpen.id === partner.id &&
                      isViewModalOpen.isOpen
                    }
                    setIsOpen={setIsViewModalOpen}
                    partner={partner}
                  />
                  {tab === "new" && (
                    <ReplyPartnerDialog
                      onSubmitCallback={({ message }: any) =>
                        replyPartnerById(partner.partnerId, message)
                      }
                    />
                  )}
                  {tab !== "active" && (
                    <button
                      onClick={() => confirmPartner(partner.partnerId)}
                      title="Confirm"
                    >
                      <Check />
                    </button>
                  )}
                  <button
                    onClick={() => unconfirmPartner(partner.partnerId)}
                    title="Delete"
                  >
                    <TrashIcon />
                  </button>
                  {tab === "active" && (
                    <button
                      onClick={() =>
                        push(`/dashboard/partners/create/${partner.partnerId}`)
                      }
                    >
                      <FilePlus />
                    </button>
                  )}
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
