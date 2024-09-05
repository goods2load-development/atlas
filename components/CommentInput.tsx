import React from 'react';
import { ChevronRight } from 'lucide-react';

const CommentInput: React.FC = () => {
  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-lg flex items-center">
      <textarea
        placeholder="Write a new comment..."
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-orange-200"
      />
      <button className="ml-2 flex items-center px-4 py-2 rounded-full bg-gray-100 border border-none">
        <ChevronRight className="w-5 h-5 text-[#FF7A00]" />
      </button>
    </div>
  );
};

export default CommentInput;