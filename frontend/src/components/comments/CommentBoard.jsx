import React from 'react';
import { connect } from 'react-redux';
import { addComment, fetchComments } from '../../redux/actions/commentActions';
import Comment from './Comment';
import CommentInput from './CommentInput';
import { useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { useSelector } from 'react-redux';
import { useUserContext } from '../../auth/UserContext';

const CommentBoard = ({ postId, fetchComments, addComment, addReply }) => {
  const { userInfo } = useUserContext();
  const { oktaAuth } = useOktaAuth();
  useEffect(() => {
    fetchComments(postId, oktaAuth.getAccessToken());
  }, [postId, fetchComments, oktaAuth]);

  const comments = useSelector((state) => state.comments.comments);

  return (
    <div>
      <div>
        {comments && comments.length > 0 ? (
          comments.map((comment) => (
            <Comment
              postId={postId}
              commentId={comment.commentId}
              key={comment.id}
              user={comment.user}
              timestamp={comment.timestamp}
              text={comment.text}
              likes={comment.likes}
              likedBy={comment.likedBy}
              replies={comment.replies} // review
            />
          ))
        ) : (
          <p>No comments yet</p>
        )}
      </div>
      <CommentInput
        addComment={(text) =>
          addComment(postId, userInfo.userId, text, oktaAuth)
        }
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  comments: state.comments.comments,
});

const mapDispatchToProps = {
  addComment,
  fetchComments,
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentBoard);
