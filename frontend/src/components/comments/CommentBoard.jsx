import React from 'react';
import { connect } from 'react-redux';
import { addComment, addReply, fetchComments } from '../../redux/actions/commentActions';
import Comment from './Comment';
import CommentInput from './CommentInput';
import { useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import {useSelector} from "react-redux";

const CommentBoard = ({ postId, fetchComments, addComment, addReply }) => {

    const { authState } = useOktaAuth();
    useEffect(() => {
        fetchComments(postId,authState.accessToken.accessToken);
    }, [postId, fetchComments,authState]);

    const comments = useSelector(state => state.comments.comments);
    // 这里暂时用的假数据，redux的comments先删掉了，你自己调一调数据结构
    /*
    const comments = [
        {
            id: 1,
            user: {
                userId: 1,
                username: 'John Doe',
                userprofile: 'https://example.com/avatar1.jpg',
            },
            timestamp: '2023-06-15',
            text: 'Great product! I highly recommend it.',
            likes: 10,
            replies: [
                {
                    id: 1,
                    user: {
                        userId: 2,
                        username: 'Jane Smith',
                        userprofile: 'https://example.com/avatar2.jpg',
                    },
                    timestamp: '2023-06-15',
                    text: '是这样的',
                },

                {
                    id: 1,
                    user: {
                        userId: 3,
                        username: 'AD',
                        userprofile: 'https://example.com/avatar2.jpg',
                    },
                    timestamp: '2023-06-30',
                    text: '6666666666',
                    // replyTo: 2 // 回复某人，通过userId，我这里写死的
                    replyTo: {
                        userId: 2,
                        username: 'Jane Smith'
                    }
                }
            ]
        },
        {
            id: 2,
            user: {
                userId: 2,
                username: 'Jane Smith',
                userprofile: 'https://example.com/avatar2.jpg',
            },
            timestamp: '2023-06-14',
            text: 'Excellent service. Will definitely buy again.',
            likes: 15,
            replies: [
                {
                    id: 1,
                    user: {
                        userId: 2,
                        username: 'Jane Smith',
                        userprofile: 'https://example.com/avatar2.jpg',
                    },
                    timestamp: '2023-06-15',
                    text: 'Thanks for your review!',
                }
            ]
        },
    ];
*/
    return (
        <div>
            {/*<h1>Comment Board</h1>*/}
            <div>
                {comments.map((comment) => (
                    <Comment
                        key={comment.id}
                        user={comment.user}
                        timestamp={comment.timestamp}
                        text={comment.text}
                        likes={comment.likes}
                        replies={comment.replies} // review
                    />
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
