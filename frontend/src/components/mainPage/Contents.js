import React, { useEffect, useState, useRef } from 'react';
import PreviewCard from './PreviewCard';
import { Link } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { loadMorePosts } from '../../redux/actions/PostActions';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../../auth/Loading';
import { useSearchContext } from './searchContext';
import { getBlockTags } from '../../redux/actions/userActions';
import { useUserContext } from '../../auth/UserContext';
import Masonry from '@mui/lab/Masonry';
import CircularProgress from '@mui/material/CircularProgress';
import { Typography } from '@mui/material';

const Contents = () => {
  const { oktaAuth } = useOktaAuth();
  const dispatch = useDispatch();
  const { searchTerm, searchByTag } = useSearchContext();
  const { userInfo } = useUserContext();
  const posts = useSelector((state) => state.posts);
  const blockedTags = useSelector((state) => state.userReducer.blockedTags);
  const [page, setPage] = useState(1);
  const pageEnd = useRef();
  const [loading, setLoading] = useState(false); // loading=true when more posts are being load
  const [hasMore, setHasMore] = useState(true); // if hasmore = false, don't fetch more items

  useEffect(() => {
    if (!loading && hasMore) {
      setLoading(true);
      dispatch(
        loadMorePosts(oktaAuth.getAccessToken(), page, page === 1 ? 30 : 10),
      ); // 30 posts on initial render, get 10 more posts for subsequent calls
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, oktaAuth, page, hasMore]);

  useEffect(() => {
    dispatch(getBlockTags(userInfo.userId, oktaAuth.getAccessToken()));
  }, [dispatch, oktaAuth, userInfo.userId]);

  useEffect(() => {
    // Check if posts are loaded and set loading to false
    if (posts && posts.length) {
      setLoading(false);

      if (posts.length < page * 10) {
        setHasMore(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((old) => old + 1);
        }
      },
      { threshold: 1 },
    );

    const el = pageEnd.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) {
        observer.unobserve(el);
      }
    };
  }, [pageEnd, loading]);

  if (!posts || !blockedTags) {
    return <Loading />;
  }

  const titleHasSearchTerm = function (searchTerm, post) {
    return post.title.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const titleHasTag = function (searchTerm, post) {
    return post.tags
      .map((string) => string.toLowerCase())
      .includes(searchTerm.toLowerCase());
  };

  const postNotBlocked = function (blockedTags, post) {
    const lowerCaseTags = blockedTags.map((string) => string.toLowerCase());
    return !post.tags
      .map((string) => string.toLowerCase())
      .some((tag) => lowerCaseTags.includes(tag));
  };

  const getFilteredPost = function (searchTerm, searchByTag, blockedTags) {
    if (searchByTag) {
      return posts.filter(
        (post) =>
          titleHasTag(searchTerm, post) && postNotBlocked(blockedTags, post),
      );
    } else {
      return posts.filter(
        (post) =>
          titleHasSearchTerm(searchTerm, post) &&
          postNotBlocked(blockedTags, post),
      );
    }
  };

  const filteredPosts = getFilteredPost(searchTerm, searchByTag, blockedTags);

  //
  return (
    <>
      <Masonry
        columns={{ xs: 2, sm: 3, md: 4, lg: 4, xl: 4, xxl: 5 }}
        spacing={1}
      >
        {filteredPosts.map((post, index) => (
          <div key={index}>
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
          </div>
        ))}
      </Masonry>
      <div ref={pageEnd} className="flex justify-center">
        {hasMore ? (
          <CircularProgress />
        ) : (
          <Typography variant="body1">There are no more posts to be loaded.</Typography>
        )}
      </div>
    </>
  );
};

export default Contents;
