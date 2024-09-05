import React from 'react';
import { ChevronUp, ChevronDown, Edit, Trash2 } from 'lucide-react';

// Define types for props
interface CommentProps {
  author: string;
  daysAgo: string;
  isEditing: boolean;
  commentText: string;
  likes: number;
  dislikes: number;
  setLikes: React.Dispatch<React.SetStateAction<number>>;
  setDislikes: React.Dispatch<React.SetStateAction<number>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setCommentText: React.Dispatch<React.SetStateAction<string>>;
  showReplies?: boolean;
  setShowReplies?: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
}

const Comment: React.FC<CommentProps> = ({
  author,
  daysAgo,
  isEditing,
  commentText,
  likes,
  dislikes,
  setLikes,
  setDislikes,
  setIsEditing,
  setCommentText,
  showReplies,
  setShowReplies,
  children
}) => {
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
            <p className="font-semibold text-gray-800">{author}</p>
            <p className="text-sm text-gray-500">{daysAgo} days ago <span className="text-gray-400">(Edited)</span></p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={() => setIsEditing(!isEditing)} className="p-2 rounded-lg hover:bg-gray-200">
            <Edit className="w-5 h-5 text-[#FF7A00]" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-200">
            <Trash2 className="w-5 h-5 text-[#FF7A00]" />
          </button>
        </div>
      </div>

      {/* Display or edit comment */}
      {isEditing ? (
        <div className="mt-4">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-orange-200"
          />
          <div className="flex justify-start mt-2">
            <button
              onClick={() => setIsEditing(false)}
              className="mr-2 px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 rounded-lg bg-[#FF7A00] text-white hover:bg-orange-600"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <p className="mt-3 text-gray-700">{commentText}</p>
      )}

      {/* Like and Dislike */}
      <div className="mt-4 flex items-center space-x-4">
        <button onClick={() => setLikes(likes + 1)} className="flex items-center p-2 rounded-lg hover:bg-gray-200">
          <ChevronUp className="w-5 h-5 text-[#FF7A00] mr-1" />
          <span className="text-gray-700">{likes}</span>
        </button>
        <button onClick={() => setDislikes(dislikes + 1)} className="flex items-center p-2 rounded-lg hover:bg-gray-200">
          <ChevronDown className="w-5 h-5 text-[#FF7A00] mr-1" />
          <span className="text-gray-700">{dislikes}</span>
        </button>
      </div>

      {/* Render children if any */}
      {children && <div className="ml-10 mt-4">{children}</div>}

      {/* Toggle replies if available */}
      {setShowReplies && (
        <button
          className="flex items-center text-sm text-gray-500 hover:underline"
          onClick={() => setShowReplies(!showReplies)}
        >
          {showReplies ? 'Hide Replies' : 'Show Replies'}
        </button>
      )}
    </div>
  );
};

export default Comment;
