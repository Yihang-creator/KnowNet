import React from 'react';
import { connect } from 'react-redux';
import { addComment, addReply } from '../redux/actions/index';
import Comment from './Comment';
import CommentInput from './CommentInput';

const CommentBoard = ({ comments, addComment, addReply }) => {
    return (
        <div>
            <h1>Comment Board</h1>
            <div>
                {comments.map((comment, index) => (
                    <Comment key={index} comment={comment} addReply={addReply} />
                ))}
            </div>
            <CommentInput addComment={addComment} />
        </div>
    );
};

const mapStateToProps = (state) => ({
    comments: state.comments.comments,
});

const mapDispatchToProps = {
    addComment,
    addReply,
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentBoard);
