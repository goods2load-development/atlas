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
import { ReactNode, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useTemplatesStore } from "@/lib/store";
import { Edit } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, "Title is required"),
});

const TemplateCategoryDialog = ({
  type,
  category,
  children,
}: {
  type: "create" | "update";
  category?: any;
  children?: ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isCreate = type === "create";
  const isUpdate = type === "update";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "all",
    shouldUnregister: false,
    ...(isUpdate && {
      defaultValues: {
        name: category.name,
      },
    }),
  });

  const { handleSubmit, control, reset } = form;

  const {
    createTemplateCategory,
    updateTemplateCategory,
    getTemplateCategories,
  } = useTemplatesStore();

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (isCreate) {
      createTemplateCategory(data)
        .then(getTemplateCategories)
        .then(() => {
          reset();
          setIsOpen(false);
        });
    }
    if (isUpdate) {
      updateTemplateCategory({
        id: category.id,
        name: data.name,
      })
        .then(getTemplateCategories)
        .then(() => {
          reset();
          setIsOpen(false);
        });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent onCloseClick={() => setIsOpen(false)} className="p-8">
        <DialogHeader>
          <DialogTitle className="text-center text-[40px]/[48px] mb-3 uppercase font-bold">
            {isCreate ? "Add new category" : "Edit category"}
          </DialogTitle>
        </DialogHeader>
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <Input
                        className="bg-gray-2 border-0 !mt-0"
                        placeholder="Category..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                onClick={handleSubmit(onSubmit)}
                type="button"
                className="bg-orangePrimary border-2 border-orangePrimary rounded-[8px] font-medium text-[16px]/[22px] w-full"
              >
                Continue
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
      <DialogTrigger asChild>
        {isCreate ? (
          children ? (
            children
          ) : (
            <Button>Add new category</Button>
          )
        ) : (
          <button title="update">
            <Edit />
          </button>
        )}
      </DialogTrigger>
    </Dialog>
  );
};

export default TemplateCategoryDialog;
