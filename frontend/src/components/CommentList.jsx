import React from 'react';
import { useSelector } from 'react-redux';

const CommentList = () => {

    const comments = useSelector((state) => state.comments);

    return (
        <div>
            {comments.map((comment, index) => (
                <div key={index}>
                    <p>{comment.text}</p>
                    <p>Posted by: {comment.author}</p>
                </div>
            ))}
        </div>
    );
};

export default CommentList;
