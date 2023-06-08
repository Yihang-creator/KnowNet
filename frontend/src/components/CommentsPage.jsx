import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addComment } from '../redux/actions/index';

const CommentBoard = ({ comments, addComment }) => {
    const [newComment, setNewComment] = useState('');

    const handleAddComment = () => {
        addComment(newComment);
        setNewComment('');
    };

    return (
        <div>
            <h1>Comment Board</h1>
            <div>
                {comments.map((comment, index) => (
                    <div key={index}>{comment}</div>
                ))}
            </div>
            <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
            />
            <button onClick={handleAddComment}>Add Comment</button>
        </div>
    );
};

const mapStateToProps = (state) => ({
    comments: state.comments.comments,
});

const mapDispatchToProps = {
    addComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentBoard);
