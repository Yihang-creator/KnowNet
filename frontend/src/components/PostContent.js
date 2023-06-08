import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
// import Comments from '../components/Comments';

export const PostContent = () => {
  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState(false);
  const [commentOpen, setCommentOpen] = useState(false);

  const { id: postId } = useParams();

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
    <div className="bg-white shadow-xl bg-zinc-50 border-1 rounded-2xl w-3/5 p-6 mb-6">
      <div className="container mx-auto">
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
        <div className="border-2 rounded-2xl border-slate-200">
          <div className=" bg-white rounded-t-2xl">
            {post.mediaType === "image" ? (
              <img
                src={post.mediaUrl}
                alt={post.title}
                className="max-w-screen-sm mx-auto p-5"
              />
            ) : (
              <video controls className="max-w-screen-sm mx-auto p-5">
                <source src={post.mediaUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            <h1 className="font-bold text-2xl pl-8">{post.title}</h1>
            <p className="text-gray-700 pl-8">{post.text}</p>
          </div>
          <div className="p-2 flex justify-between bg-white border-t-2 border-amber-100 rounded-b-2xl">
            <div>
              {likes ? (
                <FavoriteOutlinedIcon />
              ) : (
                <FavoriteBorderOutlinedIcon />
              )}
              <span className="ml-2">12 Likes</span>
            </div>
            <div onClick={() => setCommentOpen(!commentOpen)}>
              <TextsmsOutlinedIcon />
              <span className="ml-2">12 Comments</span>
            </div>
            <div>
              <ShareOutlinedIcon />
              <span className="ml-2">Share</span>
            </div>
          </div>
        </div>

        {/* {commentOpen && <Comments />} */}
      </div>
    </div>
  );
};