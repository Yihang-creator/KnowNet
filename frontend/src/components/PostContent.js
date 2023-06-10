import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import CommentBoard from "./comments/CommentBoard";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate, BrowserRouter as Router } from "react-router-dom";

export const PostContent = () => {
  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState(false);
  const [commentOpen, setCommentOpen] = useState(false);
  const { id: postId } = useParams();
  const nav = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/posts/${postId}`)
      .then((response) => {
        if (!response.ok) throw new Error("API call failed");
        return response.json();
      })
      .then((data) => setPost(data))
      .catch((error) => console.error("Error", error));
  }, [postId]);

  if (!post) {
    return <div> Post Loading ...</div>;
  }

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
            <video controls className="max-w-screen-sm mx-auto">
              <source src={post.mediaUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          <h1 className="font-bold text-2xl mt-2">{post.title}</h1>
          <p className="text-gray-700">{post.text}</p>
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            {likes ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
            <span className="ml-2"> 12 Likes</span>
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
      {commentOpen && <CommentBoard postId={post.id} />}
    </div>
  );
};
