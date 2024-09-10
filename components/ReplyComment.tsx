import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Edit, Trash2 } from 'lucide-react';
import { patchRequest, deleteRequest, postRequest } from '@/lib/utils';

interface ReplyCommentProps {
  id: string;
  userId: string;
  daysAgo: string;
  isEditing: boolean;
  commentText: string;
  likeCount: number;
  dislikeCount: number;
  setLikes: () => void;
  setDislikes: () => void;
  setIsEditing: (isEditing: boolean) => void;
  setCommentText: (text: string) => void;
  parentId: string; 
  onDelete?: () => void;
}

const ReplyComment: React.FC<ReplyCommentProps> = ({
  id,
  userId,
  daysAgo,
  isEditing,
  commentText,
  likeCount,
  dislikeCount,
  setLikes,
  setDislikes,
  setIsEditing,
  setCommentText,
  parentId,
  onDelete,
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const [editedText, setEditedText] = useState(commentText);
  const [replyText, setReplyText] = useState('');

  const handleSaveEdit = async () => {
    try {
      await patchRequest({
        url: `/blog-comments/${id}`,
        data: { comment: editedText },
      });
      setCommentText(editedText);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating reply:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteRequest({
        url: `/blog-comments/${id}`,
      });
      onDelete && onDelete(); 
    } catch (error) {
      console.error('Error deleting reply:', error);
    }
  };

  const handleReplySubmit = async () => {
    try {
      await postRequest({
        url: `/blog-comments`,
        data: {
          comment: replyText,
          parentCommentId: parentId,
          blogId: id, // Assuming each reply has the same blogId
          userId,
        },
      });
      setReplyText('');
      setIsReplying(false);
    } catch (error) {
      console.error('Error posting reply:', error);
    }
  };

  const handleLike = async () => {
    try {
      await patchRequest({
        url: `/blog-comments/${id}/reaction`,
        data: {
          userId,
          commentId: id,
          reaction: 'LIKE',
        },
      });
      setLikes();
    } catch (error) {
      console.error('Error liking reply:', error);
    }
  };

  const handleDislike = async () => {
    try {
      await patchRequest({
        url: `/blog-comments/${id}/reaction`,
        data: {
          userId,
          commentId: id,
          reaction: 'DISLIKE',
        },
      });
      setDislikes();
    } catch (error) {
      console.error('Error disliking reply:', error);
    }
  };

  return (
    <div className="my-4 p-4 rounded-lg bg-gray-50">
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <img
            src="https://via.placeholder.com/30"
            alt="Avatar"
            className="w-8 h-8 rounded-full mr-3"
          />
          <div>
            <p className="font-semibold text-gray-800">User {userId}</p>
            <p className="text-sm text-gray-500">{daysAgo} days ago</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <>
              <button onClick={handleSaveEdit} className="p-2 rounded-lg hover:bg-gray-200">
                <span className="w-5 h-5 text-[#FF7A00]">Save</span>
              </button>
              <button onClick={() => setIsEditing(false)} className="p-2 rounded-lg hover:bg-gray-200">
                <span className="w-5 h-5 text-[#FF7A00]">Cancel</span>
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setIsEditing(true)} className="p-2 rounded-lg hover:bg-gray-200">
                <Edit className="w-5 h-5 text-[#FF7A00]" />
              </button>
              <button onClick={handleDelete} className="p-2 rounded-lg hover:bg-gray-200">
                <Trash2 className="w-5 h-5 text-[#FF7A00]" />
              </button>
            </>
          )}
        </div>
      </div>

      {isEditing ? (
        <textarea
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-orange-200 mt-3"
        />
      ) : (
        <p className="mt-3 text-gray-700">{commentText}</p>
      )}

      <div className="mt-4 flex items-center space-x-4">
        <button onClick={handleLike} className="flex items-center p-2 rounded-lg hover:bg-gray-200">
          <ChevronUp className="w-5 h-5 text-[#FF7A00] mr-1" />
          <span className="text-gray-700">{likeCount}</span>
        </button>
        <button onClick={handleDislike} className="flex items-center p-2 rounded-lg hover:bg-gray-200">
          <ChevronDown className="w-5 h-5 text-[#FF7A00] mr-1" />
          <span className="text-gray-700">{dislikeCount}</span>
        </button>

        <button
          onClick={() => setIsReplying(!isReplying)}
          className="text-sm text-gray-500 hover:underline"
        >
          {isReplying ? 'Cancel Reply' : 'Reply'}
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
    </div>
  );
};

export default ReplyComment;
