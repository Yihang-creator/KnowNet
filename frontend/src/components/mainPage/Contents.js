import React from "react";
import { useEffect } from "react";
import PreviewCard from "../PreviewCard";
import { Link } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import { fetchAllPost } from "../../redux/actions/PostActions";
import { useSelector, useDispatch } from "react-redux";
import Loading from '../../auth/Loading';
import CardMedia from '@mui/material/CardMedia';
import Carousel from 'react-material-ui-carousel'

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

  // const firstFivePosts = filteredPosts.filter(post => post.mediaType === 'image').slice(0, 5);

  return (
      <div className="flex justify-center mt-10">
        <div className="flex-container justify-center rounded-lg border bg-grey-600 w-11/12">
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
                  <Link to={`/post/${post.postId}`} className="inline-block w-full p-2">
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
