import React, { useState } from 'react';

const CommentForm = () => {
    const [comment, setComment] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Dispatch action to save comment here.
        setComment(''); // Clear the input field.
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Type your comment here..."
            />
            <button type="submit">Post Comment</button>
        </form>
    );
};

export default CommentForm;
