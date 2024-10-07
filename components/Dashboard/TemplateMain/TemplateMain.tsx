"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import ListItem from "@/components/ui/list-item";
import Spinner from "@/components/ui/spinner";

import { Input } from "@/components/ui/input";
import { useTemplatesStore } from "@/lib/store";
import clsx from "clsx";
import { Edit2Icon, FileSymlink, Plus, TrashIcon } from "lucide-react";
import debounce from "lodash/debounce";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/ui/pagination";
import Link from "next/link";
import { toast, useToast } from "@/components/ui/use-toast";

const TAKE = 5;

const PartnersMain = () => {
  const {
    templatesData,
    isTemplatesLoading,
    getTemplates,
    onDeleteTemplatePage,
  } = useTemplatesStore((state) => state);

  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") || 1);
  const { toast } = useToast();

  const { push } = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const getTemplatesForPage = (page = 1, take = 5, searchTerm = "") => {
    getTemplates(page, take, searchTerm);
  };

  useEffect(() => {
    getTemplatesForPage(page, TAKE, searchTerm);
  }, [page, searchTerm]);

  const debouncedSetSearchValue = useCallback(
    debounce((value: string) => {
      setSearchTerm(value);
      handleSetPage(1);
    }, 200),
    []
  );

  const handleSetPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    if (page) {
      params.set("page", page.toString());
    } else {
      params.delete("page");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const onDeleteTemplate = (id: string) => {
    onDeleteTemplatePage(id).then((data: any) => {
      toast({
        title: "Page deleted",
        variant: "default",
        className: "bg-green-500 text-white",
      });
      getTemplatesForPage(page, TAKE, searchTerm);
    });
  };

  return (
    <div className="min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[26px] font-[400] text-[#263238] leading-[30px] text-center md:text-left">
          Templates
        </h1>
        {isTemplatesLoading && <Spinner />}
      </div>
      <div className="flex justify-between items-center mb-4">
        <Input
          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            debouncedSetSearchValue(e.currentTarget.value)
          }
          className="max-w-[400px]"
          placeholder="Search..."
        />
        <div className="flex gap-2">
          <Button onClick={() => push("/dashboard/template/categories")}>
            Categories
          </Button>
          <Button onClick={() => push("/dashboard/template/create")}>
            Create page
            <Plus />
          </Button>
        </div>
      </div>

      <div
        className={clsx({
          "pointer-events-none": isTemplatesLoading,
        })}
      >
        <div className={clsx("flex flex-col gap-4")}>
          {!isTemplatesLoading && !templatesData?.data?.length && (
            <p className="font-bold text-red-600">
              There is no any new templates at the moment.
            </p>
          )}
          {templatesData?.data?.map((template, i: number) => (
            <ListItem key={i}>
              <div className="flex gap-2 justify-between w-full">
                <Link
                  href={`/${template.title}`}
                  className="hover:underline hover:cursor-pointer"
                >
                  {template.title}
                </Link>
                <div className="flex items-center gap-2">
                  <button
                    title="edit page"
                    onClick={() =>
                      push(`/dashboard/template/edit/${template.title}`)
                    }
                  >
                    <Edit2Icon />
                  </button>
                  <button
                    title="visit page"
                    onClick={() => push(`/seo-page/${template.title}`)}
                  >
                    <FileSymlink />
                  </button>

                  <button
                    onClick={() => onDeleteTemplate(template.id)}
                    title="Delete"
                  >
                    <TrashIcon />
                  </button>
                </div>
              </div>
            </ListItem>
          ))}

          {templatesData?.meta && templatesData?.meta?.pageCount > 1 && (
            <Pagination
              page={page}
              total={templatesData?.meta?.pageCount}
              onPageChange={(newPage: number) => handleSetPage(newPage)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PartnersMain;
