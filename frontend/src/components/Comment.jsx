import React, { useState } from 'react';
import '../Styles/Comment.css';

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
            <p>{comment.text}</p>
            <p>{new Date(comment.timestamp).toLocaleString()}</p>
            <div>
                {comment.replies && comment.replies.map((reply, index) => (
                    <Comment
                        key={index}
                        comment={reply}
                        addReply={addReply}
                        depth={depth + 1} // Increase depth for each reply
                    />
                ))}
            </div>
            <textarea
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                placeholder="Type your reply here..."
            />
            <button onClick={handleAddReply}>Reply</button>
        </div>
    );
};

export default Comment;
