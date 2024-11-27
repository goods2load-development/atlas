import React, { useState } from 'react';

interface CommentInputProps {
  onSubmit: (comment: string) => void;
}

const CommentInput: React.FC<CommentInputProps> = ({ onSubmit }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (comment.trim()) {
      onSubmit(comment);
      setComment('');
    }
  };

  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-lg flex items-center">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a new comment..."
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-orange-200"
      />
      <button
        onClick={handleSubmit}
        className="ml-2 flex items-center px-4 py-2 rounded-full bg-gray-100 border border-none"
      >
        <span className="w-5 h-5 text-[#FF7A00]">&#x27A4;</span>
      </button>
    </div>
  );
};

export default CommentInput;
