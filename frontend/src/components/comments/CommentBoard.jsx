import React from 'react';
import { connect } from 'react-redux';
import { addComment, addReply, fetchComments } from '../../redux/actions';
import Comment from './Comment';
import CommentInput from './CommentInput';
import { useEffect } from 'react';

const CommentBoard = ({ postId, fetchComments, comments, addComment, addReply }) => {

    useEffect(() => {
        fetchComments(postId);
    }, [postId, fetchComments]);

    return (
        <div>
            <h1>Comment Board</h1>
            <div>
                {comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} addReply={addReply} depth={0} />
                ))}
            </div>
            <CommentInput addComment={(text) => addComment(postId, text)} />
        </div>
    );
};

const mapStateToProps = (state) => ({
    comments: state.comments.comments,
});

const mapDispatchToProps = {
    addComment,
    addReply,
    fetchComments,
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentBoard);
