import React, {useState} from 'react';
import '../../Styles/Comment.css';

const Comment = ({comment, addReply, depth}) => {
    const [newReply, setNewReply] = useState('');
    const [showReplyInput, setShowReplyInput] = useState(false);

    const handleAddReply = () => {
        if (newReply.trim() !== '') {
            addReply(comment.id, newReply);
            setNewReply('');
            setShowReplyInput(false);
        } else {
            setShowReplyInput(!showReplyInput);
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
                <p className="comment-timestamp">
                    {new Date(comment.timestamp).toLocaleString()}
                </p>
            </div>
            <div className="comment-replies">
                {comment.replies &&
                    comment.replies.map((reply, index) => (
                        <Comment
                            key={reply.id}
                            comment={reply}
                            addReply={addReply}
                            depth={depth + 1}
                        />
                    ))}
            </div>
            {showReplyInput && (
                <div className="comment-input">
          <textarea
              value={newReply}
              onChange={(e) => setNewReply(e.target.value)}
              placeholder="Type your reply here..."
          />
                    <button className="reply-button" onClick={handleAddReply}>
                        Reply
                    </button>
                </div>
            )}
            {!showReplyInput && (
                <button
                    className="reply-button"
                    onClick={() => setShowReplyInput(true)}
                >
                    Reply
                </button>
            )}
        </div>
    );
};

export default Comment;
