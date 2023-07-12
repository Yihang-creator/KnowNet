import React from "react";
import { useEffect } from "react";
import PreviewCard from "../PreviewCard";
import { Link } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import { fetchAllPost } from "../../redux/actions/PostActions";
import { useSelector, useDispatch } from "react-redux";
import Loading from '../../auth/Loading';

const Contents = ({searchTerm}) => {
  const { oktaAuth } = useOktaAuth();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchAllPost(oktaAuth.getAccessToken()))
  }, [dispatch, oktaAuth]);

  if (!posts) {
    return (<Loading />);
  }

  const filteredPosts = searchTerm
      ? posts.filter((post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      : posts;

  return (
      <div className="flex justify-center mt-20">
        <div className="flex-container justify-center rounded-lg border bg-grey-600 w-11/12">
          <ul className="flex flex-row flex-wrap justify-center">
            {filteredPosts.map((post, index) => (
                <li key={index}>
                  <Link to={`/post/${post.postId}`}>
                    <PreviewCard
                        type={post.mediaType}
                        src={post.mediaUrl}
                        title={post.title}
                        previewText={post.text}
                    />
                  </Link>
                </li>
            ))}
          </ul>
        </div>
      </div>
  );
};

export default Contents;
