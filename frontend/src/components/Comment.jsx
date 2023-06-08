import React from 'react';

const Comment = ({ comment }) => {
    return (
        <div>
            <p>{comment.text}</p>
            <p>Posted by: {comment.author}</p>
        </div>
    );
};

export default Comment;
