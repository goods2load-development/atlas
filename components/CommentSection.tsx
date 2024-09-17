import React, { useEffect, useState } from "react";
import { useUserStore } from "@/lib/store";
import Comment from "./Comment";
import CommentInput from "./CommentInput";
import { getRequest, postRequest, deleteRequest } from "@/lib/utils";
import { UserRoute } from "./Dashboard/RoutesMain/types";

interface CommentSectionProps {
  blogId: string;
  activeUsers: number;
  commentCount: number;
}

interface CommentData {
  id: string;
  comment: string;
  user: any;
  userId: string;
  blogId: string;
  date: Date;
  likeCount: number;
  dislikeCount: number;
}

interface UserState {
  user: UserRoute;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  blogId,
  activeUsers,
  commentCount,
}) => {
  const [comments, setComments] = useState<CommentData[]>([]);
  const { user } = useUserStore<UserState>((state: any) => state);

  const fetchComments = async () => {
    try {
      const response = await getRequest({
        url: `/blog-comments/${blogId}/parents`,
      });

      setComments(response);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [blogId]);

  const handleSubmitComment = async (commentText: string) => {
    if (!user?.id) {
      console.error("User is not logged in");
      return;
    }

    try {
      const newComment = await postRequest({
        url: `/blog-comments`,
        data: {
          comment: commentText,
          blogId,
          userId: user.id,
        },
      });

      setComments([newComment, ...comments]);
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteRequest({
        url: `/blog-comments/${commentId}`,
      });
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-6 p-4 bg-white rounded-lg">
      <div className="flex justify-between items-center py-2">
        <h2 className="text-xl font-semibold">{commentCount} Comments</h2>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
          <span className="mr-2 text-sm text-gray-500">Active Here:</span>
          <span className="text-[#FF4500] font-semibold">{activeUsers}</span>
        </div>
      </div>

      <CommentInput onSubmit={handleSubmitComment} />

      {comments?.map((comment) => (
        <Comment
          key={comment.id}
          id={comment.id}
          userId={comment.userId}
          userName={comment?.user?.firstName}
          currentUserId={user?.id}
          blogId={comment.blogId}
          daysAgo={Math.floor(
            (Date.now() - new Date(comment.date).getTime()) /
              (1000 * 60 * 60 * 24)
          ).toString()}
          commentText={comment.comment}
          likeCount={comment.likeCount}
          dislikeCount={comment.dislikeCount}
          showReplies={false}
          setShowReplies={() => {}}
          onDelete={() => handleDeleteComment(comment.id)}
        />
      ))}
    </div>
  );
};

export default CommentSection;
