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

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

const AddCategoryDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "all",
    shouldUnregister: false,
  });

  const { handleSubmit, control, reset, getValues, setValue } = form;

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent onCloseClick={() => setIsOpen(false)} className="p-8">
        <DialogHeader>
          <DialogTitle className="text-center text-[40px]/[48px] mb-3 uppercase font-bold">
            Add new category
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
                        placeholder="Category..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="bg-orangePrimary border-2 border-orangePrimary rounded-[8px] font-medium text-[16px]/[22px] w-full"
              >
                Continue
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
      <DialogTrigger asChild>
        <Button>Add new category</Button>
      </DialogTrigger>
    </Dialog>
  );
};

export default AddCategoryDialog;
