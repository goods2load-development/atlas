import React, { useState } from 'react';
import CommentInput from './CommentInput';
import Comment from './Comment';

const CommentSection: React.FC = () => {
  const [showReplies, setShowReplies] = useState<boolean>(false);
  const [parentLikes, setParentLikes] = useState<number>(0);
  const [parentDislikes, setParentDislikes] = useState<number>(0);
  const [replyLikes, setReplyLikes] = useState<number>(4);
  const [replyDislikes, setReplyDislikes] = useState<number>(6);

  const [isEditingParent, setIsEditingParent] = useState<boolean>(false);
  const [parentCommentText, setParentCommentText] = useState<string>('This is the actual comment.');
  const [isEditingReply, setIsEditingReply] = useState<boolean>(false);
  const [replyCommentText, setReplyCommentText] = useState<string>('This is a reply to the comment.');

  return (
    <div className="w-full max-w-2xl mx-auto my-6 p-4 bg-white rounded-lg">
      {/* Comments Header */}
      <div className="flex justify-between items-center py-2">
        <h2 className="text-xl font-semibold">0 Comments</h2>
        <div className="flex items-center">
          <span className="mr-2 text-[#FF4500]">Active Here:</span>
          <span className="text-[#FF4500] font-semibold">0</span>
        </div>
      </div>

      {/* Comment Input */}
      <CommentInput />

      {/* Parent Comment */}
      <Comment
        author="John Doe"
        daysAgo="6"
        isEditing={isEditingParent}
        commentText={parentCommentText}
        likes={parentLikes}
        dislikes={parentDislikes}
        setLikes={setParentLikes}
        setDislikes={setParentDislikes}
        setIsEditing={setIsEditingParent}
        setCommentText={setParentCommentText}
        showReplies={showReplies}
        setShowReplies={setShowReplies}
      >
        {/* Reply Comment */}
        {showReplies && (
          <Comment
            author="Jane Doe"
            daysAgo="5"
            isEditing={isEditingReply}
            commentText={replyCommentText}
            likes={replyLikes}
            dislikes={replyDislikes}
            setLikes={setReplyLikes}
            setDislikes={setReplyDislikes}
            setIsEditing={setIsEditingReply}
            setCommentText={setReplyCommentText}
          />
        )}
      </Comment>
    </div>
  );
};

export default CommentSection;