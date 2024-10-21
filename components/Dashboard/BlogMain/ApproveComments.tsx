'use client';

import ViewCommentDialog from './ViewCommentDialog';
import { BlogComment } from './types';
import { useBlogAdminStore } from '@/lib/store';

import { useEffect, useMemo } from 'react';

import { clsx } from 'clsx';
import { Check, Trash } from 'lucide-react';
import Link from 'next/link';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import ListItem from '@/components/ui/list-item';
import Spinner from '@/components/ui/spinner';
import { useToast } from '@/components/ui/use-toast';

const ApproveComments = () => {
  const {
    isBlogLoading,
    unapprovedComments,
    getUnapprovedComments,
    approveComment,
    deleteCommentById,
  } = useBlogAdminStore();
  const { toast } = useToast();

  const groupedComments = useMemo(() => {
    if (!unapprovedComments) return unapprovedComments;
    const grouped = unapprovedComments.reduce((acc: any, comment) => {
      if (!acc[comment.blogId]) {
        acc[comment.blogId] = [];
      }

      acc[comment.blogId].push(comment);
      return acc;
    }, {});

    return Object.values(grouped) as BlogComment[][];
  }, [unapprovedComments]);

  useEffect(() => {
    getUnapprovedComments();
  }, []);

  const handleApproveComment = (id: string) => {
    approveComment(id)
      .then(getUnapprovedComments)
      .then(() =>
        toast({
          title: 'Comment approved.',
          variant: 'destructive',
          className: 'bg-green-500 text-white',
        }),
      );
  };

  const handleDelete = (id: string) => {
    deleteCommentById(id)
      .then(() => getUnapprovedComments())
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
          Unapproved comments
        </h1>
        {isBlogLoading && <Spinner />}
      </div>
      <div
        className={clsx('flex flex-col gap-4', {
          'pointer-events-none': isBlogLoading,
        })}
      >
        {!unapprovedComments.length && !isBlogLoading && (
          <p className="text-red-600">There is not any comments.</p>
        )}
        <Accordion
          type="single"
          collapsible
          className="w-full self-center flex flex-col justify-center"
        >
          {groupedComments.map((group) => (
            <AccordionItem
              key={group[0].id}
              value={group[0].id}
              className="w-full relative pt-[30px] "
            >
              <AccordionTrigger className="text-white px-4 rounded-md bg-orangePrimary mb-2 w-full">
                {group[0].blog.title}
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2">
                {group.map((comment) => (
                  <ListItem key={comment.id}>
                    <div className="w-full flex justify-between gap-2">
                      <Link
                        href={`/blog/${comment.blog.slug}?id=${comment.blogId}`}
                        className="max-w-[400px]"
                      >
                        {comment.comment}
                      </Link>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApproveComment(comment.id)}
                          title="approve"
                        >
                          <Check />
                        </button>
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
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default ApproveComments;
