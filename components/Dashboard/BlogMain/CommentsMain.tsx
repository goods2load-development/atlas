'use client';

import ViewCommentDialog from './ViewCommentDialog';
import { useBlogAdminStore } from '@/lib/store';

import { useEffect } from 'react';

import clsx from 'clsx';
import { Trash } from 'lucide-react';
import { useParams } from 'next/navigation';

import ListItem from '@/components/ui/list-item';
import Spinner from '@/components/ui/spinner';
import { useToast } from '@/components/ui/use-toast';

const CommentsMain = () => {
  const { id: blogId } = useParams();
  const { comments, isBlogLoading, getCommentsById, deleteCommentById } =
    useBlogAdminStore();

  const { toast } = useToast();

  useEffect(() => {
    getCommentsById(blogId as string);
  }, []);

  const handleDelete = (id: string) => {
    deleteCommentById(id)
      .then(() => getCommentsById(blogId as string))
      .then(() =>
        toast({
          title: 'Comment deleted.',
          variant: 'destructive',
          className: 'bg-green-500 text-white',
        }),
      );
  };

  return (
    <div className="min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[26px] font-[400] text-[#263238] leading-[30px] text-center md:text-left">
          Comments
        </h1>
        {isBlogLoading && <Spinner />}
      </div>
      <div
        className={clsx('flex flex-col gap-4', {
          'pointer-events-none': isBlogLoading,
        })}
      >
        {!comments.length && !isBlogLoading && (
          <p className="text-red-600">There is not any comments.</p>
        )}
        {comments.map((comment) => (
          <ListItem key={comment.id}>
            <div className="w-full flex justify-between gap-2">
              <p className="max-w-[400px]">{comment.comment}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleDelete(comment.id)}
                  className="delete"
                >
                  <Trash />
                </button>
                <ViewCommentDialog comment={comment} />
              </div>
            </div>
          </ListItem>
        ))}
      </div>
    </div>
  );
};

export default CommentsMain;
