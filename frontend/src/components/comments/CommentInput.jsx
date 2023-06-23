import React, { useState } from 'react';
import '../../Styles/Comment.css';

const CommentInput = ({ addComment }) => {
    const [newComment, setNewComment] = useState('');

    const handleAddComment = () => {
        if (newComment.trim() !== '') {
            addComment(newComment);
            setNewComment('');
        }
    };

    return (
        <div className="comment-input">
        <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Type your comment here..."
        />
            <button onClick={handleAddComment}>Add Comment</button>
        </div>
    );

};

export default CommentInput;
