'use client';

import { useBlogAdminStore } from '@/lib/store';
import { zodResolver } from '@hookform/resolvers/zod';

import { useState } from 'react';

import { Edit } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  name: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
});

const CategoryDialog = ({
  type,
  category,
}: {
  type: 'create' | 'update';
  category?: any;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isCreate = type === 'create';
  const isUpdate = type === 'update';

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'all',
    shouldUnregister: false,
    ...(isUpdate && {
      defaultValues: {
        name: category.name,
        description: category.description,
      },
    }),
  });

  const { handleSubmit, control, reset } = form;

  const { createBlogCategory, updateBlogCategory, getBlogCategories } =
    useBlogAdminStore();

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (isCreate) {
      createBlogCategory(data)
        .then(getBlogCategories)
        .then(() => {
          reset();
          setIsOpen(false);
        });
    }
    if (isUpdate) {
      updateBlogCategory(data, category.id)
        .then(getBlogCategories)
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
            {isCreate ? 'Add new category' : 'Edit category'}
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
              <FormField
                control={control}
                name="description"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <Textarea
                        className="bg-gray-2 border-0 min-h-[200px]"
                        placeholder="Description..."
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
                Continue
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
      <DialogTrigger asChild>
        {isCreate ? (
          <Button>Add new category</Button>
        ) : (
          <button title="update">
            <Edit />
          </button>
        )}
      </DialogTrigger>
    </Dialog>
  );
};

export default CategoryDialog;
