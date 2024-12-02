import ReplyComment from './ReplyComment';
import pencilIcon from '@/assets/icons/pencel.svg';
import trashIcon from '@/assets/icons/trash.svg';
import userIcon from '@/assets/images/user.png';
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
} from '@/lib/utils';

import React, { useEffect, useState } from 'react';

import clsx from 'clsx';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export type ActiveReaction = 'like' | 'dislike' | null;

export interface CommentData {
  id: string;
  comment: string;
  likeCount: number;
  dislikeCount: number;
  date: string;
  userId: string;
  user: any;
  blogId: string;
  parentCommentId?: string;
  replies: CommentData[];
  edited: boolean;
}

interface CommentProps {
  id: string;
  userId: string;
  userName: string;
  userPhoto: string;
  daysAgo: string;
  currentUserId: string;
  commentText: string;
  edited: boolean;
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
  userName,
  userPhoto,
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
  edited,
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const [editedText, setEditedText] = useState(commentText);
  const [replyText, setReplyText] = useState('');
  const [replies, setReplies] = useState<CommentData[]>([]);

  const [areRepliesVisible, setAreRepliesVisible] = useState(false);
  const [repliesFetched, setRepliesFetched] = useState(false);

  const [localLikesCount, setLocalLikesCount] = useState(likeCount);
  const [localDislikesCount, setLocalDislikesCount] = useState(dislikeCount);
  const [localCommentText, setLocalCommentText] = useState(commentText);
  const [activeReaction, setActiveReaction] = useState<ActiveReaction>(null);
  const [localIsCommentEdited, setlocalIsCommentEdited] =
    useState<boolean>(edited);

  const isAvailableToEdit = currentUserId === userId;
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchReplies();
  }, []);

  const handleSaveEdit = async () => {
    try {
      await patchRequest({
        url: `/blog-comments/${id}`,
        data: { comment: editedText },
      });
      setLocalCommentText(editedText);
      setIsEditing(false);
      setlocalIsCommentEdited(true);
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const handleDelete = async () => {
    try {
      onDelete && onDelete();
    } catch (error) {
      console.error('Error deleting comment:', error);
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
      setReplyText('');
      setIsReplying(false);
    } catch (error) {
      console.error('Error posting reply:', error);
    }
  };

  const fetchReplies = async () => {
    if (!repliesFetched) {
      try {
        const response = await getRequest({
          url: `/blog-comments/parent/${id}/replies`,
        });

        setReplies(response);
        setRepliesFetched(true);

        return response;
      } catch (error) {
        console.error('Error fetching replies:', error);
      }
    }
  };

  const handleLike = async () => {
    if (!currentUserId) {
      router.push('/sign-in');
      return;
    }

    try {
      await patchRequest({
        url: `/blog-comments/${id}/reaction`,
        data: {
          userId: currentUserId,
          commentId: id,
          reaction: 'LIKE',
        },
      }).then(({ likeCount, dislikeCount }) => {
        setLocalDislikesCount(dislikeCount);

        if (likeCount > localLikesCount) {
          setActiveReaction('like');
        } else {
          setActiveReaction(null);
        }

        setLocalLikesCount(likeCount);
      });
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  const onToggleIsReplies = () => {
    setRepliesFetched(false);

    if (!areRepliesVisible) {
      fetchReplies();
    }
    setAreRepliesVisible((state) => !state);
  };

  const addReplies = (data: CommentData): void => {
    setReplies((state: CommentData[]) => [...state, data]);
  };

  const handleDislike = async () => {
    if (!currentUserId) {
      router.push('/sign-in');
      return;
    }

    try {
      await patchRequest({
        url: `/blog-comments/${id}/reaction`,
        data: {
          userId: currentUserId,
          commentId: id,
          reaction: 'DISLIKE',
        },
      }).then(({ dislikeCount, likeCount }) => {
        if (dislikeCount > localDislikesCount) {
          setActiveReaction('dislike');
        } else {
          setActiveReaction(null);
        }

        setLocalLikesCount(likeCount);
        setLocalDislikesCount(dislikeCount);
      });
    } catch (error) {
      console.error('Error disliking comment:', error);
    }
  };

  const handleReplieCommentDelete = async (id: string) => {
    await deleteRequest({
      url: `/blog-comments/${id}`,
    })
      .then((data) => {
        setReplies((data) => [...data.filter((item) => item.id !== id)]);
      })
      .catch((error) => {
        console.error('Error deleting comment', error);
      });
  };

  return (
    <div className="my-4 p-4 rounded-lg">
      <div className="flex items-center gap-4">
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
            {userName || 'User'}
          </p>
          <p className="text-sm text-gray-500">
            {Number(daysAgo) <= 0 ? 'today' : `${daysAgo} days ago`}
          </p>
          {localIsCommentEdited && (
            <p className="text-sm ml-3">
              {'('}Edited{')'}
            </p>
          )}
        </div>
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
                      src={trashIcon}
                      alt="trash"
                    />
                  </button>
                </>
              )
            : null}
        </div>
      </div>

      {isEditing ? (
        <div className="p-4 bg-gray-100 mt-3 rounded-md sm:ml-14">
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
        <p className="mt-3 text-gray-700 sm:pl-14">{localCommentText}</p>
      )}

      <div className="mt-4 flex items-center space-x-4 sm:pl-14">
        <button
          onClick={handleLike}
          className={clsx(
            'flex items-center px-2 py-0.5 rounded-2xl border-primaryOrange border gap-0.5 hover:bg-lightOrange transition-all',
            activeReaction === 'like' && localLikesCount !== 0
              ? 'bg-[#FFC1A2]'
              : null,
          )}
        >
          <span className="text-gray-700">{localLikesCount}</span>
          <ChevronUp className="w-5 h-5 text-gray-700" />
        </button>
        <button
          onClick={handleDislike}
          className={clsx(
            'flex items-center px-2 py-0.5 rounded-2xl gap-1 border-primaryOrange border hover:bg-lightOrange transition-all',
            activeReaction === 'dislike' && localDislikesCount !== 0
              ? 'bg-[#FFC1A2]'
              : null,
          )}
        >
          <span className="text-gray-700">{localDislikesCount}</span>
          <ChevronDown className="w-5 h-5 text-gray-700" />
        </button>

        <button
          onClick={() => setIsReplying(!isReplying)}
          className="text-sm hover:no-underline underline"
        >
          {isReplying ? 'Cancel Reply' : 'Reply'}
        </button>
      </div>

      {isReplying && (
        <div className="mt-4 sm:ml-14">
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

      {!!replies.length && (
        <button
          onClick={onToggleIsReplies}
          className="text-sm hover:underline flex items-center gap-1 mt-6"
        >
          {areRepliesVisible ? 'Hide Replies' : 'Replies'}
          {areRepliesVisible ? (
            <ChevronUp className="w-4 h-6" />
          ) : (
            <ChevronDown className="w-4 h-6" />
          )}
        </button>
      )}

      {areRepliesVisible && (
        <div className="ml-6 mt-4">
          {replies.map((reply) => (
            <ReplyComment
              key={reply.id}
              id={reply.id}
              currentUserId={currentUserId}
              userId={reply.userId}
              userName={reply.user?.companyName}
              userPhoto={reply?.user?.companyPhoto}
              daysAgo={Math.floor(
                (Date.now() - new Date(reply.date).getTime()) /
                  (1000 * 60 * 60 * 24),
              ).toString()}
              commentText={reply.comment}
              likeCount={reply.likeCount}
              dislikeCount={reply.dislikeCount}
              blogId={blogId}
              parentId={reply.id}
              edited={reply.edited}
              onDelete={handleReplieCommentDelete}
              addReplies={addReplies}
            />
          ))}
        </div>
      )}

      {showReplies && <div className="ml-6 mt-4">{children}</div>}
    </div>
  );
};

export default Comment;
