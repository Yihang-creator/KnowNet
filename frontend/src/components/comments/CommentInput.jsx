import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
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
		<Box>
			<TextField
				id="comment-input"
				label="Write a comment"
				variant="outlined"
				multiline
				rows={2}
				fullWidth
				value={newComment}
				onChange={(e) => setNewComment(e.target.value)}
				sx={{ marginTop: 1 }}
			/>
			<Button
				variant="contained"
				color="primary"
				onClick={handleAddComment}
				sx={{ marginTop: 1 }}
			>
				Submit
			</Button>
		</Box>
	);
};

export default CommentInput;
