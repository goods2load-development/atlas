'use client';

import TemplateCategoryDialog from './TemplateCategoryDialog';
import { useBlogAdminStore, useTemplatesStore } from '@/lib/store';

import { useEffect } from 'react';

import { clsx } from 'clsx';
import { Trash } from 'lucide-react';

import ListItem from '@/components/ui/list-item';
import Spinner from '@/components/ui/spinner';
import { useToast } from '@/components/ui/use-toast';

const TemplateCategoriesMain = () => {
  const {
    categories,
    isTemplateCategoriesLoading,
    getTemplateCategories,
    deleteTemplateCategory,
  } = useTemplatesStore();
  const { toast } = useToast();

  useEffect(() => {
    getTemplateCategories();
  }, []);

  const handleDeleteTemplateCategory = (id: string) => {
    deleteTemplateCategory(id).then((data) => {
      if (data) {
        getTemplateCategories();
        toast({
          title: 'Category deleted.',
          variant: 'destructive',
          className: 'bg-green-500 text-white',
        });
      }
    });
  };

  return (
    <div className="min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[26px] font-[400] text-[#263238] leading-[30px] text-center md:text-left">
          Categories
        </h1>
        {isTemplateCategoriesLoading && <Spinner />}
      </div>
      <div className="flex justify-end gap-2 mb-4">
        <TemplateCategoryDialog type="create" />
      </div>
      <div
        className={clsx('flex flex-col gap-4', {
          'pointer-events-none': isTemplateCategoriesLoading,
        })}
      >
        {!categories?.length && !isTemplateCategoriesLoading && (
          <p className="text-red-600">There is not any categories.</p>
        )}
        {categories &&
          categories.map((category) => (
            <ListItem key={category.name}>
              <div className="w-full flex justify-between gap-2">
                <p className="max-w-[400px]">{category.name}</p>
                <div className="flex gap-2">
                  <TemplateCategoryDialog type="update" category={category} />
                  <button
                    onClick={() => handleDeleteTemplateCategory(category.id)}
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

export default TemplateCategoriesMain;
