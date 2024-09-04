"use client";
import ListItem from "@/components/ui/list-item";
import Spinner from "@/components/ui/spinner";
import { useBlogAdminStore } from "@/lib/store";
import { clsx } from "clsx";
import { useEffect } from "react";
import ViewCommentDialog from "./ViewCommentDialog";
import { Check, Trash } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ApproveComments = () => {
  const {
    isBlogLoading,
    unapprovedComments,
    getUnapprovedComments,
    approveComment,
    deleteCommentById,
  } = useBlogAdminStore();
  const { toast } = useToast();

  useEffect(() => {
    getUnapprovedComments();
  }, []);

  const handleApproveComment = (id: string) => {
    approveComment(id)
      .then(getUnapprovedComments)
      .then(() =>
        toast({
          title: "Comment approved.",
          variant: "destructive",
          className: "bg-green-500 text-white",
        })
      );
  };

  const handleDelete = (id: string) => {
    deleteCommentById(id)
      .then(() => getUnapprovedComments())
      .then(() =>
        toast({
          title: "Comment deleted.",
          variant: "destructive",
          className: "bg-green-500 text-white",
        })
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
        className={clsx("flex flex-col gap-4", {
          "pointer-events-none": isBlogLoading,
        })}
      >
        {!unapprovedComments.length && !isBlogLoading && (
          <p className="text-red-600">There is not any comments.</p>
        )}
        {unapprovedComments.map((comment) => (
          <ListItem key={comment.id}>
            <div className="w-full flex justify-between gap-2">
              <p className="max-w-[400px]">{comment.comment}</p>
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
      </div>
    </div>
  );
};

export default ApproveComments;
