'use client';

import CategoryDialog from './CategoryDialog';
import { useBlogAdminStore } from '@/lib/store';

import { useEffect } from 'react';

import { clsx } from 'clsx';
import { Trash } from 'lucide-react';

import ListItem from '@/components/ui/list-item';
import Spinner from '@/components/ui/spinner';
import { useToast } from '@/components/ui/use-toast';

const ApproveComments = () => {
  const { isBlogLoading, categories, getBlogCategories, deleteBlogCategory } =
    useBlogAdminStore();
  const { toast } = useToast();

  useEffect(() => {
    getBlogCategories();
  }, []);

  const handleDeleteCategory = (id: string) => {
    deleteBlogCategory(id)
      .then(getBlogCategories)
      .then(() =>
        toast({
          title: 'Category deleted.',
          variant: 'destructive',
          className: 'bg-green-500 text-white',
        }),
      );
  };

  return (
    <div className="min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[26px] font-[400] text-[#263238] leading-[30px] text-center md:text-left">
          Categories
        </h1>
        {isBlogLoading && <Spinner />}
      </div>
      <div className="flex justify-end gap-2 mb-4">
        <CategoryDialog type="create" />
      </div>
      <div
        className={clsx('flex flex-col gap-4', {
          'pointer-events-none': isBlogLoading,
        })}
      >
        {!categories.length && !isBlogLoading && (
          <p className="text-red-600">There is not any comments.</p>
        )}
        {categories.map((category) => (
          <ListItem key={category.id}>
            <div className="w-full flex justify-between gap-2">
              <p className="max-w-[400px]">{category.name}</p>
              <div className="flex gap-2">
                <CategoryDialog type="update" category={category} />
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  title="delete"
                >
                  <Trash />
                </button>
              </div>
            </div>
          </ListItem>
        ))}
      </div>
    </div>
  );
};

export default ApproveComments;
