"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import { useEffect, useMemo, useState } from "react";
import { CirclePlus, Edit } from "lucide-react";
import { getAllRoutes } from "./utils";

import Autocomplete from "@/components/ui/autocomplete";
import { getRequest } from "@/lib/utils";

const formSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    innerLink: z.string().optional(),
    outerLink: z.string().optional(),
  })
  .refine((data) => !(data.innerLink && data.outerLink), {
    message: "Only one of inner link or outer link must be provided, not both.",
    path: ["link"], // Specifies where the error relates
  });

const LinkDialog = ({
  type,
  addNewItem,
  editItem,
  data,
}: {
  type: "create" | "edit";
  addNewItem?: (data: { title: string; href: string }) => void;
  editItem?: (data: { title: string; href: string }) => void;
  data?: {
    title: string;
    href: string;
  };
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [routes, setRoutes] = useState<string[]>([]);
  const [pages, setPages] = useState<string[]>([]);

  const availableRoutes = useMemo(() => [...pages, ...routes], [routes, pages]);

  const isCreate = type === "create";
  const isEdit = type === "edit";

  useEffect(() => {
    (async () => {
      const [routes, pages] = await Promise.all([
        getAllRoutes(),
        getRequest({
          url: "seo-pages/urls",
        }),
      ]);
      setRoutes(routes);
      setPages(pages.map((page: { title: string }) => `/${page.title}`));
    })();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "all",
    shouldUnregister: false,
    defaultValues: {
      title: isEdit && data ? data.title : "",
      innerLink:
        isEdit && data && routes.includes(data.href) ? data.href : undefined,
      outerLink:
        isEdit && data && !routes.includes(data.href) ? data.href : undefined,
    },
  });

  const { handleSubmit, control } = form;

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const formattedData = {
      title: data.title,
      href: (data.innerLink || data.outerLink) as string,
    };
    if (isCreate && addNewItem) {
      addNewItem(formattedData);
    }
    if (isEdit && editItem) {
      editItem(formattedData);
    }
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        isOverlay={false}
        onCloseClick={() => setIsOpen(false)}
        className="p-8"
      >
        <DialogHeader>
          <DialogTitle className="text-center text-[40px]/[48px] mb-3 uppercase font-bold">
            {isCreate ? "Add new link" : "Edit link"}
          </DialogTitle>
        </DialogHeader>
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <FormField
                control={control}
                name="title"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <Input
                        className="bg-gray-2 border-0 !mt-0"
                        placeholder="Title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="innerLink"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <Autocomplete
                        data={availableRoutes}
                        placeholder="Internal link"
                        defaultValue={form.getValues("innerLink") || undefined}
                        {...field}
                        setOuterPick={(pick) =>
                          form.setValue("innerLink", pick || undefined)
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="outerLink"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <Input
                        className="bg-gray-2 border-0 !mt-0"
                        placeholder="External link"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormMessage>
                {(form.formState.errors as any)?.link?.message}
              </FormMessage>

              <Button
                onClick={(e) => e.stopPropagation()}
                type="submit"
                className="bg-orangePrimary border-2 border-orangePrimary rounded-[8px] font-medium text-[16px]/[22px] w-full"
              >
                {isCreate ? "Add" : "Edit"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
      <DialogTrigger asChild>
        {isCreate ? (
          <button>
            <CirclePlus size={15} color="orange" />
          </button>
        ) : (
          <button title="update">
            <Edit size={15} color="orange" />
          </button>
        )}
      </DialogTrigger>
    </Dialog>
  );
};

export default LinkDialog;
