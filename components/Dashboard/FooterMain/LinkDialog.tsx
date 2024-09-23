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
import { useState } from "react";
import { CirclePlus, Edit } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  href: z.string().min(1, "Link is required"),
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

  const isCreate = type === "create";
  const isEdit = type === "edit";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "all",
    shouldUnregister: false,
    defaultValues: {
      title: isEdit && data ? data.title : "",
      href: isEdit && data ? data.href : "",
    },
  });

  const { handleSubmit, control } = form;

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (isCreate && addNewItem) {
      addNewItem(data);
    }
    if (isEdit && editItem) {
      editItem(data);
    }
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent onCloseClick={() => setIsOpen(false)} className="p-8">
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
                name="href"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <Input
                        className="bg-gray-2 border-0 !mt-0"
                        placeholder="Link"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
