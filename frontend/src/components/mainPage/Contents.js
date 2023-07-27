import React from "react";
import { useEffect } from "react";
import PreviewCard from "../PreviewCard";
import { Link } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import { fetchAllPost } from "../../redux/actions/PostActions";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../auth/Loading";
import { useSearchContext } from "./searchContext";

const Contents = () => {
  const { oktaAuth } = useOktaAuth();
  const dispatch = useDispatch();
  const { searchTerm, searchByTag } = useSearchContext();
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchAllPost(oktaAuth.getAccessToken()));
  }, [dispatch, oktaAuth]);

  if (!posts) {
    return <Loading />;
  }

  const filteredByTag = function (posts, searchTerm) {
    const filtered = [];
    for (const post of posts) {
      if (post.tags.map(string => string.toLowerCase()).includes(searchTerm.toLowerCase())) {
        filtered.push(post)
      }
    }
    return filtered;
  }

  const getFilteredPost = function (searchTerm, searchByTag) {
    // const searchByTag = false;
    if (!searchTerm) return posts;
    if (!searchByTag) {
      return posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return filteredByTag(posts, searchTerm);
  };

  

  const filteredPosts = getFilteredPost(searchTerm, searchByTag);


  // const firstFivePosts = filteredPosts.filter(post => post.mediaType === 'image').slice(0, 5);

  return (
    <div className="mt-10 flex justify-center">
      <div className="flex-container bg-grey-600 w-11/12 justify-center rounded-lg border">
        <ul className="rounded-md p-2 md:columns-2 lg:columns-4">
          {/* <li className="max-h-[500px] max-w-[500px] overflow-hidden">
              <Carousel navButtonsAlwaysVisible={true}>
                    {firstFivePosts.map((post, index) => (
                      <div key={index}>
                        <CardMedia
                          component="img"
                          image={post.mediaUrl}
                          title={post.title}
                          sx={{ maxHeight: '100%', objectFit: 'contain' }}
                        />
                      </div>
                    ))}
              </Carousel>
            </li> */}
          {filteredPosts.map((post, index) => (
            <li key={index}>
              <Link
                to={`/post/${post.postId}`}
                className="inline-block w-full p-2"
              >
                <PreviewCard
                  type={post.mediaType}
                  src={post.mediaUrl}
                  title={post.title}
                  previewText={post.text}
                  username={post.username}
                  userPhotoUrl={post.userPhotoUrl}
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
