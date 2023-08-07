import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  CardContent,
  Dialog,
  DialogActions,
  Fab,
  Grid,
  IconButton,
  Typography,
  Zoom,
} from '@mui/material';
import {
  FavoriteBorder,
  Message,
  Notes,
  PersonAddAlt1,
  PersonOff,
} from '@mui/icons-material';
import EditForm from './EditForm';
import { styled, useTheme } from '@mui/material/styles';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import PopupButton from './PopupButton';
import { Link, useParams } from 'react-router-dom';
import ProfileCard from './ProfileCard';
import { useOktaAuth } from '@okta/okta-react';
import { useUserContext } from '../../auth/UserContext';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PostEdit from '../mainPage/postEdit';
import SearchBar from '../mainPage/SearchBar';
import BlockedTags from './BlockedTags';
import ResponsiveDrawer from '../mainPage/ResponsiveDrawer';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, fetchAllPost } from '../../redux/actions/PostActions';
import { follow } from '../../redux/actions/userActions';
import Masonry from '@mui/lab/Masonry';

const UserInfoPage = ({ name, email }) => {
  const [userInfo, setUserInfo] = useState({});
  const { userId } = useParams();
  const { oktaAuth } = useOktaAuth();

  useEffect(() => {
    fetch(`/api/users/getUserById/${userId}`, {
      headers: {
        Authorization: 'Bearer ' + oktaAuth.getAccessToken(),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUserInfo(data);
        setSelectedImage(data.userPhotoUrl);
      });
  }, [oktaAuth, userId]);
  const { userInfo: currentUserInfo } = useUserContext();
  if (userInfo.userId) {
    name = userInfo.username;
    email = userInfo.email;
  }
  const users = useSelector((state) => state.userReducer['followers']);
  const theme = useTheme();
  const avatar = userInfo == null ? null : userInfo.userPhotoUrl;
  const [selectedImage, setSelectedImage] = useState(avatar);
  const posts = useSelector((state) => state.posts);
  const [open, setOpen] = useState(false);
  const [editPost, setEditPost] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const [setSearchTerm] = useState('');
  const [showPosts, setShowPosts] = useState(true);
  const [selected, setSelected] = useState(false);
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const ifFollowing = (users || []).some(
      (i) => i.userId === currentUserInfo.userId,
    );
    setSelected(ifFollowing);
  }, [currentUserInfo.userId, users]);

  useEffect(() => {
    dispatch(fetchAllPost(oktaAuth.getAccessToken()));
  }, [dispatch, oktaAuth]);

  if (!posts) {
    return <div> Post Loading ...</div>;
  }

  const filterPosts = () => {
    if (showPosts) {
      return posts.filter((post) => post.userId === userInfo.userId);
    } else {
      return posts.filter((post) => {
        const includes =
          post.like && post.like.includes(userInfo.userId.toString());
        return includes;
      });
    }
  };

  const handleClickOpen = (post) => {
    console.log('post:', post);
    fetch(`/api/posts/${post.postId}`, {
      headers: {
        Authorization: 'Bearer ' + oktaAuth.getAccessToken(),
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error('API call failed');
        return response.json();
      })
      .then((data) => {
        setEditPost(data);
        setOpen(true);
      })
      .catch((error) => console.error('Error', error));
  };

  const handleDelete = (post) => {
    dispatch(deletePost(post.postId, oktaAuth.getAccessToken()));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditStatus = () => {
    setEditStatus(!editStatus);
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const fabStyle = {
    position: 'fixed',
    bottom: 16,
    right: 16,
  };

  const fab = {
    sx: fabStyle,
    icon: editStatus ? <DoneIcon /> : <EditIcon />,
    label: 'Edit',
    variant: 'extended',
    color: 'primary',
  };

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#766c6b54'),
    backgroundColor: '#766c6b54',
    '&:hover': {
      backgroundColor: '#766c6b54',
    },
    borderRadius: '25px',
    height: '40%',
  }));

  const isSelf = currentUserInfo.userId === userInfo.userId;

  const handleFollow = () => {
    let operation = selected ? 'unfollow' : 'follow';
    dispatch(
      follow(
        currentUserInfo.userId,
        userInfo.userId,
        operation,
        'followers',
        oktaAuth.getAccessToken(),
        () => {
          setSelected(!selected);
        },
      ),
    );
  };

  // open share modal
  const handleShareClick = () => {
    setOpenDialog(true);
  };

  const shareUrl = window.location.href;

  return (
    <Box sx={{ display: 'flex' }}>
      <ResponsiveDrawer />
      <Box sx={{ flexGrow: 1 }}>
        <div className="flex flex-col gap-4 p-2">
          <SearchBar setSearchTerm={setSearchTerm} />
          <Box
            sx={{
              background: 'linear-gradient(#041a2d, #515f72)',
              borderRadius: '5px',
            }}
          >
            <Grid className="flex justify-between p-5 pt-7">
              <Grid className="flex">
                <div className="relative mt-4 h-36 w-36 justify-center rounded-full bg-white">
                  <div className="absolute inset-0 overflow-hidden rounded-full">
                    {selectedImage && (
                      <img
                        className="h-full w-full"
                        src={selectedImage}
                        alt="profile"
                      />
                    )}
                  </div>
                </div>
                <Box className="flex items-center pl-2">
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography
                      component="div"
                      variant="h4"
                      color="#fff"
                      sx={{ marginBottom: '12px' }}
                    >
                      {name}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      component="div"
                      color="#bfbdbd"
                    >
                      @{email}
                    </Typography>
                  </CardContent>
                </Box>
              </Grid>
              <div>
                <ColorButton
                  variant="contained"
                  onClick={handleShareClick}
                  sx={{ marginTop: '20px' }}
                >
                  <ShareOutlinedIcon />
                </ColorButton>
                <Dialog
                  open={openDialog}
                  onClose={() => {
                    setOpenDialog(false);
                  }}
                >
                  <DialogActions>
                    <IconButton
                      component="a"
                      href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FacebookIcon />
                    </IconButton>
                    <IconButton
                      component="a"
                      href={`https://twitter.com/share?url=${shareUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <TwitterIcon />
                    </IconButton>
                  </DialogActions>
                </Dialog>
              </div>
            </Grid>
            <Grid className="flex justify-between p-2 text-white">
              <Grid className="flex w-full items-center justify-between gap-2">
                <Grid className="flex ">
                  <PopupButton
                    type="followings"
                    token={oktaAuth.getAccessToken()}
                    isSelf={isSelf}
                    userInfo={userInfo}
                  />
                  <PopupButton
                    type="followers"
                    token={oktaAuth.getAccessToken()}
                    isSelf={isSelf}
                    userInfo={userInfo}
                    selected={selected}
                  />

                  {isSelf ? <BlockedTags /> : ''}
                  {isSelf ? (
                    <EditForm
                      setUserInfo={setUserInfo}
                      setSelectedImage={setSelectedImage}
                    />
                  ) : (
                    ''
                  )}
                </Grid>
                <Grid>
                  {isSelf ? (
                    ''
                  ) : (
                    <>
                      <ColorButton variant="contained" onClick={handleFollow}>
                        {selected ? (
                          <>
                            <PersonOff className="mr-2" />
                            unfollow
                          </>
                        ) : (
                          <>
                            <PersonAddAlt1 className="mr-2" />
                            follow
                          </>
                        )}
                      </ColorButton>
                      <Link to={`/chat/${userInfo.userId}`}>
                        <ColorButton
                          variant="contained"
                          sx={{ margin: '0 15px' }}
                        >
                          <Message />
                        </ColorButton>
                      </Link>
                    </>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Box>

          <Grid
            sx={{ flexDirection: 'column', background: '#515f72' }}
            className="flex rounded-md border-2 p-2 text-white"
          >
            <Grid className="flex justify-center gap-4 rounded-md p-2">
              <ColorButton
                variant="contained"
                sx={{ margin: '0 15px' }}
                onClick={() => setShowPosts(true)}
              >
                <Notes sx={{ marginRight: '5px' }} />
                Posts
              </ColorButton>
              <ColorButton
                variant="contained"
                sx={{ margin: '0 15px' }}
                onClick={() => setShowPosts(false)}
              >
                <FavoriteBorder sx={{ marginRight: '5px' }} />
                Liked
              </ColorButton>
            </Grid>

            <Masonry
              columns={{ xs: 2, sm: 3, md: 4, lg: 4, xl: 4, xxl: 5 }}
              spacing={1}
            >
              {filterPosts().map((post, index) => (
                <div key={index} className="relative inline-block w-full p-2">
                  <Link to={`/post/${post.postId}`}>
                    <ProfileCard
                      type={post.mediaType}
                      src={post.mediaUrl}
                      title={post.title}
                      previewText={post.text}
                    />
                  </Link>
                  {editStatus ? (
                    <Fab
                      variant="extended"
                      sx={{
                        position: 'absolute',
                        left: '20px',
                        top: '20px',
                        width: '20px',
                        opacity: '0.5',
                        zIndex: '10',
                      }}
                      aria-label="edit"
                      onClick={() => handleClickOpen(post)}
                    >
                      <EditIcon />
                    </Fab>
                  ) : (
                    ''
                  )}
                  {editStatus ? (
                    <Fab
                      variant="extended"
                      sx={{
                        position: 'absolute',
                        left: '20px',
                        top: '80px',
                        width: '20px',
                        opacity: '0.5',
                        zIndex: '10',
                      }}
                      aria-label="edit"
                      onClick={() => handleDelete(post)}
                    >
                      <DeleteIcon />
                    </Fab>
                  ) : (
                    ''
                  )}
                </div>
              ))}
            </Masonry>
            {isSelf ? (
              <Zoom
                key={fab.color}
                in={true}
                timeout={transitionDuration}
                style={{
                  transitionDelay: `${transitionDuration.exit}ms`,
                }}
                unmountOnExit
              >
                <Fab
                  sx={fab.sx}
                  aria-label={fab.label}
                  color={fab.color}
                  onClick={handleEditStatus}
                >
                  {fab.icon}
                </Fab>
              </Zoom>
            ) : (
              ''
            )}
            <PostEdit post={editPost} open={open} handleClose={handleClose} />
          </Grid>
        </div>
      </Box>
    </Box>
  );
};

export default UserInfoPage;
