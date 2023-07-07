import { useState, useEffect } from "react";
import ReactPlayer from 'react-player/lazy';
import { useOktaAuth } from '@okta/okta-react';
import { useParams, Link } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { red } from "@mui/material/colors";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import CommentBoard from "./comments/CommentBoard";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addLike, cancelLike } from "../redux/actions/commentActions";
import { fetchPost } from "../redux/actions/PostActions";

export const PostContent = () => {

  const { oktaAuth } = useOktaAuth();
  const [liked, setLiked] = useState(false);
  const [commentOpen, setCommentOpen] = useState(false);
  const { id: postId } = useParams();
  const nav = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPost(postId, oktaAuth.getAccessToken()));
  }, [dispatch, postId, oktaAuth]);

  const post = useSelector((state) => state.posts.find(post => post.postId === postId));

  if (!post) {
    return <div> Post Loading ...</div>;
  }

  var likes = post.like;
  const changeLiked = (liked) => {
    setLiked(!liked);
    !liked
        ? dispatch(addLike(postId))
        : dispatch(cancelLike(postId));
  };

  // bg-white background color
  // shadow-md set shadow
  // rounded-lg rounded corners
  // p-6 padding
  // mb-6 margin-bottom 1.5rem

  return (
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="container mx-auto">
          <button onClick={() => nav(-1)}>
            <CloseIcon />
          </button>

          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img
                  src={post.profilePic}
                  alt=""
                  className="w-12 h-12 rounded-full mr-4"
              />
              <div className="text-sm">
                <Link
                    to={`/profile/${post.userId}`}
                    className="text-black no-underline hover:underline"
                >
                  <span className="font-bold">{post.name}</span>
                </Link>
                {/* date */}
                <div className="text-gray-600">Posted 1 min ago</div>
              </div>
            </div>
            <MoreHorizIcon />
          </div>
          <div className="mt-4">
            {post.mediaType === "image" ? (
                <img
                    src={post.mediaUrl}
                    alt={post.title}
                    className="max-w-screen-sm mx-auto"
                />
            ) : (
                <ReactPlayer className="max-w-screen-sm mx-auto" url={post.mediaUrl} controls={true} />
            )}
            <h1 className="font-bold text-2xl mt-2">{post.title}</h1>
            <p className="text-gray-700">{post.text}</p>
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <div
                  style={{ display: "inline" }}
                  onClick={() => changeLiked(liked)}
              >
                {liked ? (
                    <FavoriteOutlinedIcon sx={{ color: red[500] }} />
                ) : (
                    <FavoriteBorderOutlinedIcon />
                )}
              </div>
              <span className="ml-2" style={{ display: "inline" }}>
              {" "}
                {likes} Likes
            </span>
            </div>
            <div>
              <button
                  onClick={() => setCommentOpen(!commentOpen)}
                  className="flex items-center"
              >
                <TextsmsOutlinedIcon />
                <span className="ml-2">Comments</span>
              </button>
            </div>
            <div>
              <ShareOutlinedIcon />
              <span className="ml-2">Share</span>
            </div>
          </div>
        </div>
        <CommentBoard postId={post.postId} />
      </div>
  );
};
