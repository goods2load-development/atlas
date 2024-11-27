'use client';

import DashboardLayout from '@/app/_components/DashboardLayout/DashboardLayout';
import { useBlogAdminStore } from '@/lib/store';

import { useEffect } from 'react';

import { useParams } from 'next/navigation';

import CreateUpdateBlog from '@/components/Dashboard/BlogMain/CreateUpdateBlog';

export default function EditBlog() {
  const { blog, getBlog } = useBlogAdminStore();
  const { id: blogId } = useParams();

  useEffect(() => {
    getBlog(blogId as string);
  }, []);

  return (
    <DashboardLayout>
      <>
        <div className="lg:p-10 p-4 bg-[#f5f4f3] pt-20">
          {blog && <CreateUpdateBlog post={blog} type="update" />}
        </div>
      </>
    </DashboardLayout>
  );
}
