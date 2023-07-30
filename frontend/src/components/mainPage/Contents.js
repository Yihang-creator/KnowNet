import React from 'react';
import { useEffect } from 'react';
import PreviewCard from './PreviewCard';
import { Link } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { fetchAllPost } from '../../redux/actions/PostActions';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../../auth/Loading';
import { useSearchContext } from './searchContext';
import { getBlockTags } from '../../redux/actions/userActions';
import { useUserContext } from '../../auth/UserContext';

const Contents = () => {
	const { oktaAuth } = useOktaAuth();
	const dispatch = useDispatch();
	const { searchTerm, searchByTag } = useSearchContext();
	const { userInfo } = useUserContext();
	const posts = useSelector((state) => state.posts);
	const blockedTags = useSelector((state) => state.userReducer.blockedTags);

	useEffect(() => {
		dispatch(fetchAllPost(oktaAuth.getAccessToken()));
	}, [dispatch, oktaAuth]);

	useEffect(() => {
		dispatch(getBlockTags(userInfo.userId, oktaAuth.getAccessToken()));
	}, [dispatch, oktaAuth, userInfo.userId]);

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
					titleHasTag(searchTerm, post) && postNotBlocked(blockedTags, post)
			);
		} else {
			return posts.filter(
				(post) =>
					titleHasSearchTerm(searchTerm, post) &&
					postNotBlocked(blockedTags, post)
			);
		}
	};

	const filteredPosts = getFilteredPost(searchTerm, searchByTag, blockedTags);

	return (
		<div className="mt-10 flex justify-center">
			<div className="flex-container bg-grey-600 w-11/12 justify-center rounded-lg border">
				<ul className="rounded-md p-2 md:columns-2 lg:columns-4">
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
