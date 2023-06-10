import React, { useState } from 'react';
import '../../Styles/Comment.css';

const Comment = ({ comment, addReply, depth }) => {
    const [newReply, setNewReply] = useState('');

    const handleAddReply = () => {
        if (newReply.trim() !== '') {
            addReply(comment.id, newReply);
            setNewReply('');
        }
    };

    const indentSize = 20;

    const commentStyle = {
        marginLeft: `${depth * indentSize}px`,
    };

    return (
        <div style={commentStyle} className="comment">
            <div className="comment-content">
                <p className="comment-text">{comment.text}</p>
                <p className="comment-timestamp">{new Date(comment.timestamp).toLocaleString()}</p>
            </div>
            <div className="comment-replies">
                {comment.replies && comment.replies.map((reply, index) => (
                    <Comment
                        key={reply.id}
                        comment={reply}
                        addReply={addReply}
                        depth={depth + 1}
                    />
                ))}
            </div>
            <div className="comment-input">
                <textarea
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    placeholder="Type your reply here..."
                />
                <button onClick={handleAddReply}>Reply</button>
            </div>
        </div>
    );
};

export default Comment;
