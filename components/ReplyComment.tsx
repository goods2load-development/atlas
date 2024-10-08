import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronUp, ChevronDown, CornerLeftUp } from "lucide-react";
import { patchRequest, postRequest } from "@/lib/utils";
import Image from "next/image";
import userIcon from "@/assets/user.png";
import pencilIcon from "@/assets/pencel.svg";
import trushIcon from "@/assets/trush.svg";
import { ActiveReaction, CommentData } from "./Comment";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { getRequest } from "@/lib/utils";

interface ReplyCommentProps {
  id: string;
  userId: string;
  userName?: string;
  userPhoto?: string;
  currentUserId: string;
  daysAgo: string;

  commentText: string;
  likeCount: number;
  dislikeCount: number;
  blogId: string;
  edited: boolean;

  parentId: string;
  onDelete: (id: string) => void;
  addReplies: (data: CommentData) => void;
}

const ReplyComment: React.FC<ReplyCommentProps> = ({
  id,
  userId,
  userName,
  userPhoto,
  currentUserId,
  daysAgo,

  commentText,
  likeCount,
  dislikeCount,
  blogId,
  edited,

  parentId,
  onDelete,
  addReplies,
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const [editedText, setEditedText] = useState(commentText);
  const [replyText, setReplyText] = useState("");
  const [localLikesCount, setLocalLikesCount] = useState(likeCount);
  const [localDislikeCount, setLocalDislikeCount] = useState(dislikeCount);
  const [activeReaction, setActiveReaction] = useState<ActiveReaction>(null);
  const [localCommentText, setLocalCommentText] = useState(commentText);
  const [localIsEditedComment, setLocalIsEditedComment] =
    useState<boolean>(edited);

  const isAvailableToEdit = currentUserId === userId;
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const isFetched = useRef(false);

  useEffect(() => {
    console.log(userId, "123");
    return () => {
      setIsEditing(false);
    };
  }, []);

  const handleSaveEdit = async () => {
    try {
      await patchRequest({
        url: `/blog-comments/${id}`,
        data: { comment: editedText },
      });
      setLocalCommentText(editedText);
      setIsEditing(false);
      setLocalIsEditedComment(true);
    } catch (error) {
      console.error("Error updating reply:", error);
    }
  };

  const handleReplySubmit = async () => {
    try {
      await postRequest({
        url: `/blog-comments`,
        data: {
          comment: replyText,
          parentCommentId: parentId,
          blogId, // Assuming each reply has the same blogId
          userId: currentUserId,
        },
      });
      setReplyText("");
      setIsReplying(false);
    } catch (error) {
      console.error("Error posting reply:", error);
    }
  };

  const handleDelete = async () => {
    try {
      onDelete && onDelete(id);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  useEffect(() => {
    if (!isFetched.current) {
      (async () => {
        await fetchReplies(id);
      })();
      isFetched.current = true;
    }
  }, [id]);

  const fetchReplies = useCallback(
    async (id: string) => {
      if (!isFetched.current) {
        try {
          const response: CommentData[] = await getRequest({
            url: `/blog-comments/parent/${id}/replies`,
          });

          if (response.length) {
            response.forEach((item) => {
              addReplies(item);
              fetchReplies(item.id);
            });
          }
        } catch (error) {
          console.error("Error fetching replies:", error);
        }
      }
    },
    [id]
  );

  const handleLike = async () => {
    if (!currentUserId) {
      router.push("/registration?user");
      return;
    }

    try {
      await patchRequest({
        url: `/blog-comments/${id}/reaction`,
        data: {
          userId: currentUserId,
          commentId: id,
          reaction: "LIKE",
        },
      }).then(({ likeCount, dislikeCount }) => {
        if (likeCount > localLikesCount) {
          setActiveReaction("like");
        } else {
          setActiveReaction(null);
        }
        setLocalDislikeCount(dislikeCount);

        setLocalLikesCount(likeCount);
      });
    } catch (error) {
      console.error("Error liking reply:", error);
    }
  };

  const handleDislike = async () => {
    if (!currentUserId) {
      router.push("/registration?user");
      return;
    }

    try {
      await patchRequest({
        url: `/blog-comments/${id}/reaction`,
        data: {
          userId: localStorage.getItem("id"),
          commentId: id,
          reaction: "DISLIKE",
        },
      }).then(({ likeCount, dislikeCount }) => {
        if (dislikeCount > localDislikeCount) {
          setActiveReaction("dislike");
        } else {
          setActiveReaction(null);
        }

        setLocalLikesCount(likeCount);
        setLocalDislikeCount(dislikeCount);
      });
    } catch (error) {
      console.error("Error disliking reply:", error);
    }
  };

  return (
    <div className="my-4">
      <div className="flex items-center gap-5">
        <CornerLeftUp className="text-gray-500 mb-3" />
        <div className="flex items-center">
          {userPhoto ? (
            <Image
              className="w-[38px] h-[38px] rounded-full"
              width={38}
              height={38}
              src={`${process.env.NEXT_PUBLIC_BASE_URL}${userPhoto}`}
              alt="user"
            />
          ) : (
            <Image
              className="w-[38px] h-[38px] rounded-full"
              width={38}
              height={38}
              src={userIcon}
              alt="user"
            />
          )}

          <p className="font-medium ml-4 mr-6 text-gray-800">
            {userName || "User"}
          </p>
          <p className="text-sm text-gray-500 mr-3">
            {Number(daysAgo) <= 0 ? "today" : `${daysAgo} days ago`}
          </p>
          {localIsEditedComment && (
            <p className="text-sm mr-3">
              {"("}Edited{")"}
            </p>
          )}
          <div className="flex items-center space-x-2 gap-3">
            {isAvailableToEdit
              ? !isEditing && (
                  <>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="min-w-5 min-h-5 hover:opacity-80 transition-opacity"
                    >
                      <Image
                        className=""
                        width={20}
                        height={20}
                        src={pencilIcon}
                        alt="edit"
                      />
                    </button>
                    <button
                      onClick={handleDelete}
                      className="min-w-5 min-h-5 hover:opacity-80 transition-opacity"
                    >
                      <Image
                        className=""
                        width={20}
                        height={20}
                        src={trushIcon}
                        alt="trush"
                      />
                    </button>
                  </>
                )
              : null}
          </div>
        </div>
      </div>

      {isEditing ? (
        <div className="p-4 bg-gray-100 mt-3 rounded-md ml-[100px]">
          <textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="w-full p-3 border border-gray-100 rounded-lg focus:outline-none focus:ring focus:ring-orange-200 mt-3"
          />

          <div className="flex gap-2 mt-3">
            <button
              onClick={() => setIsEditing(false)}
              className="py-2 font-medium px-4 bg-[#000] rounded-3xl text-white hover:opacity-80 transition-opacity"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveEdit}
              className="py-2 font-medium px-4 bg-primaryOrange rounded-3xl text-white hover:opacity-80 transition-opacity"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <p className="mt-3 text-gray-700 pl-[100px]">{localCommentText}</p>
      )}

      <div className="mt-4 flex items-center space-x-4 pl-[100px]">
        <button
          onClick={handleLike}
          className={clsx(
            "flex items-center px-2 py-0.5 rounded-2xl border-primaryOrange border gap-0.5 hover:bg-lightOrange transition-all",
            activeReaction === "like" && localLikesCount !== 0
              ? "bg-[#FFC1A2]"
              : null
          )}
        >
          <span className="text-gray-700">{localLikesCount}</span>
          <ChevronUp className="w-5 h-5 text-gray-700" />
        </button>
        <button
          onClick={handleDislike}
          className={clsx(
            "flex items-center px-2 py-0.5 rounded-2xl gap-1 border-primaryOrange border hover:bg-lightOrange transition-all",
            activeReaction === "dislike" && localDislikeCount !== 0
              ? "bg-[#FFC1A2]"
              : null
          )}
        >
          <span className="text-gray-700">{localDislikeCount}</span>
          <ChevronDown className="w-5 h-5 text-gray-700" />
        </button>

        <button
          onClick={() => setIsReplying(!isReplying)}
          className="text-sm hover:no-underline underline"
        >
          {isReplying ? "Cancel Reply" : "Reply"}
        </button>
      </div>

      {isReplying && (
        <div className="mt-4 ml-[100px]">
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
              Reply
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
    </div>
  );
};

export default ReplyComment;
