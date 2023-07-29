import {useEffect, useMemo, useState} from "react";
import ReactPlayer from 'react-player/lazy';
import {useOktaAuth} from '@okta/okta-react';
import {Link, useNavigate, useParams} from "react-router-dom";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import {red} from "@mui/material/colors";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import CommentBoard from "../comments/CommentBoard";
import CloseIcon from "@mui/icons-material/Close";
import {useDispatch, useSelector} from "react-redux";
import {fetchPost} from "../../redux/actions/PostActions";
import {ContentState, convertFromRaw, Editor, EditorState} from 'draft-js';
import Layout from "./Layout";
import InteractiveVideo from "../interactiveVideo/InteractiveVideo";
import {calculateTimeAgo} from "../utils/calculateTimeAgo";
import {Dialog, DialogActions, IconButton, Typography,} from "@mui/material";
import ShowTags from "./ShowTags";
import {useUserContext} from "../../auth/UserContext";
import {changeLike} from '../../redux/actions/commentActions';

export function createEditorStateFromText(text) {
    try {
        const rawContentFromDB = JSON.parse(text);
        const contentState = convertFromRaw(rawContentFromDB);
        return EditorState.createWithContent(contentState);
    } catch (e) {
        // The text was not in JSON format, so treat it as plain text
        if (!text) {
            return EditorState.createEmpty();
        }
        const contentState = ContentState.createFromText(text);
        return EditorState.createWithContent(contentState);
    }
}

export const PostContent = () => {

    const {oktaAuth} = useOktaAuth();
    const [commentOpen, setCommentOpen] = useState(false);
    const {id: postId} = useParams();
    const nav = useNavigate();
    const dispatch = useDispatch();
    const [timeAgo, setTimeAgo] = useState('');
    const {userInfo} = useUserContext();
    const userID = userInfo == null ? 99 : userInfo.userId;


    const post = useSelector((state) => state.posts.find(post => post.postId === postId));
    useEffect(() => {
        dispatch(fetchPost(postId, oktaAuth.getAccessToken()));
    }, [dispatch, postId, oktaAuth]);

    useEffect(() => {
        if (timeAgo === '') {
            setTimeAgo(calculateTimeAgo(post?.timestamp));
        }
        const interval = setInterval(() => {
            setTimeAgo(calculateTimeAgo(post?.timestamp));
        }, 60000); // Update the time every minute (60000 milliseconds)

        return () => clearInterval(interval);
    }, [post?.timestamp, timeAgo]);


    const [liked, setLiked] = useState(false);

    useEffect(() => {
        const alreadyLiked = post?.like?.includes(userID) || false;
        setLiked(alreadyLiked);
    }, [post, userID]);


    const [openDialog, setOpenDialog] = useState(false);

    const rootId = useMemo(() => {
        if (post?.interactiveVideos && post.interactiveVideos.length > 0) {
            const rootVideo = post.interactiveVideos.find((item) => item.root === true);
            if (rootVideo) {
                return rootVideo.id;
            }
        }
        return null;
    }, [post])

    if (!post) {
        return <div> Post Loading ...</div>;
    }

    if (!post.like) {
        return <div> Like Loading ...</div>;
    }

    var likes = post.like.length;
    var enrichedText = typeof post.text === 'undefined' ? EditorState.createEmpty() : createEditorStateFromText(post.text);

    const likechanged = async (liked) => {
        setLiked(!liked);
        let returnedFunction;
        if (!liked) {
            returnedFunction = changeLike(post, false, userID, oktaAuth)
        } else {
            returnedFunction = changeLike(post, true, userID, oktaAuth)
        }
        await returnedFunction(dispatch)

    };

    const handleShareClick = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const shareUrl = window.location.href;

    // bg-white background color
    // shadow-md set shadow
    // rounded-lg rounded corners
    // p-6 padding
    // mb-6 margin-bottom 1.5rem

    const content = (
        <div className="shadow-md rounded-lg p-6 mb-6">
            <div className="container mx-auto">
                <button onClick={() => nav(-1)}>
                    <CloseIcon/>
                </button>

                <div className="flex justify-between items-center mt-4">
                    <Link
                        to={`/profile/${post.userId}`}
                        className="text-black no-underline hover:underline"
                    >
                        <div className="flex items-center">
                            <img
                                src={post.userPhotoUrl}
                                alt=""
                                className="w-12 h-12 rounded-full mr-4"
                            />
                            <div className="text-sm">
                                <Typography variant="body2" color="textSecondary">
                                    {post.username}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {timeAgo}
                                </Typography>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="mt-4">
                    {post.mediaType === "image" ? (
                        <img
                            src={post.mediaUrl}
                            alt={post.title}
                            className="max-w-screen-sm mx-auto"
                        />
                    ) : post.interactiveVideos && post.interactiveVideos.length > 0 ? (
                            <InteractiveVideo postId={post.postId} rootId={rootId}/>
                        ) :
                        (<ReactPlayer className="max-w-screen-sm mx-auto" url={post.mediaUrl} controls={true}/>)
                    }
                    <h1 className="font-bold text-2xl mt-2">{post.title}</h1>
                    <Editor
                        editorState={enrichedText}
                        readOnly
                    />
                </div>
                <div className="mt-4 flex justify-between">
                    <div>
                        <div
                            style={{display: "inline"}}
                            onClick={() => likechanged(liked)}
                        >
                            {liked ? (
                                <FavoriteOutlinedIcon sx={{color: red[500]}}/>
                            ) : (
                                <FavoriteBorderOutlinedIcon/>
                            )}
                        </div>
                        <span className="ml-2" style={{display: "inline"}}>
              {" "}
                            {likes} Likes
            </span>
                    </div>
                    <div>
                        <button
                            onClick={() => setCommentOpen(!commentOpen)}
                            className="flex items-center"
                        >
                            <TextsmsOutlinedIcon/>
                            <span className="ml-2">Comments</span>
                        </button>
                    </div>
                    <div>
                        <IconButton onClick={handleShareClick}>
                            <ShareOutlinedIcon/>
                        </IconButton>
                        <span className="ml-2" onClick={handleShareClick}>Share</span>
                        <Dialog open={openDialog} onClose={handleClose}>
                            <DialogActions>
                                <IconButton
                                    component="a"
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FacebookIcon/>
                                </IconButton>
                                <IconButton
                                    component="a"
                                    href={`https://twitter.com/share?url=${shareUrl}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <TwitterIcon/>
                                </IconButton>
                            </DialogActions>
                        </Dialog>
                    </div>
                </div>
                <ShowTags tags={post.tags}></ShowTags>
            </div>
            <CommentBoard postId={post.postId}/>
        </div>
    );


    return (
        <Layout>
            {content}
        </Layout>
    );
};