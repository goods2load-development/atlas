import React, { useEffect, useState } from "react";
import { ChevronUp, ChevronDown, Edit, Trash2 } from "lucide-react";
import {
  patchRequest,
  deleteRequest,
  postRequest,
  getRequest,
} from "@/lib/utils";
import ReplyComment from "./ReplyComment";

interface CommentData {
  id: string;
  comment: string;
  likeCount: number;
  dislikeCount: number;
  date: string;
  userId: string;
  blogId: string;
  parentCommentId?: string;
  replies: CommentData[];
}

interface CommentProps {
  id: string;
  userId: string;
  daysAgo: string;
  currentUserId: string;
  commentText: string;
  blogId: string;
  likeCount: number;
  dislikeCount: number;
  showReplies?: boolean;
  setShowReplies?: () => void;
  children?: React.ReactNode;
  onDelete?: () => void;
  parentId?: string;
}

const Comment: React.FC<CommentProps> = ({
  id,
  userId,
  daysAgo,
  commentText,
  likeCount,
  dislikeCount,
  currentUserId,
  blogId,
  showReplies,
  setShowReplies,
  children,
  onDelete,
  parentId,
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const [editedText, setEditedText] = useState(commentText);
  const [replyText, setReplyText] = useState("");
  const [replies, setReplies] = useState<CommentData[]>([]);
  const [areRepliesVisible, setAreRepliesVisible] = useState(false);
  const [repliesFetched, setRepliesFetched] = useState(false);

  const [localLikesCount, setLocalLikesCount] = useState(likeCount);
  const [localDislikesCount, setLocalDislikesCount] = useState(dislikeCount);
  const [localCommentText, setLocalCommentText] = useState(commentText);

  const isAvailableToEdit = currentUserId === userId;

  const [isEditing, setIsEditing] = useState(false);

  const handleSaveEdit = async () => {
    try {
      await patchRequest({
        url: `/blog-comments/${id}`,
        data: { comment: editedText },
      });
      setLocalCommentText(editedText);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const handleDelete = async () => {
    try {
      onDelete && onDelete();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleReplySubmit = async () => {
    try {
      const newReply = await postRequest({
        url: `/blog-comments`,
        data: {
          comment: replyText,
          parentCommentId: parentId || id,
          blogId,
          userId,
        },
      });
      setReplies([newReply, ...replies]);
      setReplyText("");
      setIsReplying(false);
    } catch (error) {
      console.error("Error posting reply:", error);
    }
  };

  const fetchReplies = async () => {
    if (!repliesFetched) {
      try {
        const response = await getRequest({
          url: `/blog-comments/parent/${id}/replies`,
        });
        console.log(response, "replies");
        setReplies(response);
        setRepliesFetched(true);
      } catch (error) {
        console.error("Error fetching replies:", error);
      }
    }
    setAreRepliesVisible(!areRepliesVisible);
  };

  const handleLike = async () => {
    try {
      await patchRequest({
        url: `/blog-comments/${id}/reaction`,
        data: {
          userId: currentUserId,
          commentId: id,
          reaction: "LIKE",
        },
      }).then(({ likeCount, dislikeCount }) => {
        setLocalDislikesCount(dislikeCount);
        setLocalLikesCount(likeCount);
      });
    } catch (error) {
      console.error("Error liking comment:", error);
    }
  };

  const handleDislike = async () => {
    try {
      await patchRequest({
        url: `/blog-comments/${id}/reaction`,
        data: {
          userId: currentUserId,
          commentId: id,
          reaction: "DISLIKE",
        },
      }).then(({ dislikeCount, likeCount }) => {
        setLocalLikesCount(likeCount);
        setLocalDislikesCount(dislikeCount);
      });
    } catch (error) {
      console.error("Error disliking comment:", error);
    }
  };

  const handleReplieCommentDelete = async (id: string) => {
    await deleteRequest({
      url: `/blog-comments/${id}`,
    })
      .then((data) => {
        setReplies((data) => [...data.filter((item) => item.id !== id)]);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error deleting comment", error);
      });
  };

  return (
    <div className="my-4 p-4 rounded-lg bg-gray-100">
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <img
            src="https://via.placeholder.com/40"
            alt="Avatar"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <p className="font-semibold text-gray-800">User {userId}</p>
            <p className="text-sm text-gray-500">
              {Number(daysAgo) <= 0 ? "today" : `${daysAgo} days ago`}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {isAvailableToEdit &&
            (isEditing ? (
              <>
                <button
                  onClick={handleSaveEdit}
                  className="p-2 rounded-lg hover:bg-gray-200"
                >
                  <span className="w-5 h-5 text-[#FF7A00]">Save</span>
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="p-2 rounded-lg hover:bg-gray-200"
                >
                  <span className="w-5 h-5 text-[#FF7A00]">Cancel</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 rounded-lg hover:bg-gray-200"
                >
                  <Edit className="w-5 h-5 text-[#FF7A00]" />
                </button>
                <button
                  onClick={handleDelete}
                  className="p-2 rounded-lg hover:bg-gray-200"
                >
                  <Trash2 className="w-5 h-5 text-[#FF7A00]" />
                </button>
              </>
            ))}
        </div>
      </div>

      {isEditing ? (
        <textarea
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-orange-200 mt-3"
        />
      ) : (
        <p className="mt-3 text-gray-700">{localCommentText}</p>
      )}

      <div className="mt-4 flex items-center space-x-4">
        <button
          onClick={handleLike}
          className="flex items-center p-2 rounded-lg hover:bg-gray-200"
        >
          <ChevronUp className="w-5 h-5 text-[#FF7A00] mr-1" />
          <span className="text-gray-700">{localLikesCount}</span>
        </button>
        <button
          onClick={handleDislike}
          className="flex items-center p-2 rounded-lg hover:bg-gray-200"
        >
          <ChevronDown className="w-5 h-5 text-[#FF7A00] mr-1" />
          <span className="text-gray-700">{localDislikesCount}</span>
        </button>

        <button
          onClick={() => setIsReplying(!isReplying)}
          className="text-sm text-gray-500 hover:underline"
        >
          {isReplying ? "Cancel Reply" : "Reply"}
        </button>

        <button
          onClick={fetchReplies}
          className="text-sm text-gray-500 hover:underline"
        >
          {areRepliesVisible ? "Hide Replies" : "Show Replies"}
        </button>
      </div>

      {isReplying && (
        <div className="mt-4 ml-6">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write your reply..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-orange-200"
          />
          <div className="flex justify-start mt-2">
            <button
              onClick={handleReplySubmit}
              className="mr-2 px-4 py-2 rounded-lg bg-[#FF7A00] text-white hover:bg-orange-600"
            >
              Save
            </button>
            <button
              onClick={() => setIsReplying(false)}
              className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {areRepliesVisible && (
        <div className="ml-6 mt-4">
          {replies.map((reply) => (
            <ReplyComment
              key={reply.id}
              id={reply.id}
              currentUserId={currentUserId}
              userId={reply.userId}
              daysAgo={Math.floor(
                (Date.now() - new Date(reply.date).getTime()) /
                  (1000 * 60 * 60 * 24)
              ).toString()}
              commentText={reply.comment}
              likeCount={reply.likeCount}
              dislikeCount={reply.dislikeCount}
              blogId={blogId}
              parentId={reply.id}
              onDelete={handleReplieCommentDelete}
            />
          ))}
        </div>
      )}

      {showReplies && <div className="ml-6 mt-4">{children}</div>}
    </div>
  );
};

export default Comment;
