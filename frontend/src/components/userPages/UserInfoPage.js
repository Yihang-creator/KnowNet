import { useState, useEffect } from "react";
import { Box, Typography, CardContent, Grid, Chip, Fab, Zoom, Toolbar} from '@mui/material';
import { Face } from '@mui/icons-material'
import { useTheme } from '@mui/material/styles';
import PopupButton from "./PopupButton";
import { Link } from "react-router-dom";
import ProfileCard from "./ProfileCard";
import Dropdown from "../mainPage/Dropdown";
import { useOktaAuth } from "@okta/okta-react";
import { useUserContext } from "../../auth/UserContext";
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from "@mui/icons-material/Edit";
import PostEdit from "../mainPage/postEdit";
import SearchBar from '../mainPage/SearchBar';
import ResponsiveDrawer from '../mainPage/ResponsiveDrawer';

const UserInfoPage = ({ name, email }) => {
  const { userInfo } = useUserContext();
  const theme = useTheme();
  const avatar = userInfo == null ? null : userInfo.userPhotoUrl;
  const [selectedImage, setSelectedImage] = useState(avatar);
  const [posts, setPosts] = useState(null);
  const { oktaAuth } = useOktaAuth();
  const [open, setOpen] = useState(false);
  const [editPost, setEditPost] = useState(false);
  const [editStatus, setEditStatus] = useState(false); // Whether to enter editing mode
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(`/api/posts`, {
      headers: {
        Authorization: "Bearer " + oktaAuth.getAccessToken(),
      },
    })
        .then((response) => {
          if (!response.ok) throw new Error("API call failed");
          return response.json();
        })
        .then((data) => setPosts(data))
        .catch((error) => console.error("Error", error));
  }, [oktaAuth]);

  if (!posts) {
    return <div> Post Loading ...</div>;
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleClickOpen = (post) => {
    console.log('post:', post)
    fetch(`/api/posts/${post.postId}`, { // assuming your API endpoint follows this pattern and post objects have 'id' field
      headers: {
        Authorization: "Bearer " + oktaAuth.getAccessToken(),
      },
    })
        .then((response) => {
          if (!response.ok) throw new Error("API call failed");
          return response.json();
        })
        .then((data) => {
          setEditPost(data); // Here, the data should be the detailed post data returned from the server
          setOpen(true);
        })
        .catch((error) => console.error("Error", error));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditStatus = () => {
    setEditStatus(!editStatus)
  }

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
    variant: "extended",
    color: "primary",
  }

  return (
      <Box sx={{ display: 'flex' }}>
        {/*<Box sx={{ display: 'flex', overflow: 'auto'}}>*/}
          <ResponsiveDrawer />
        {/*  <Box sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, maxWidth: '100%', overflowX: 'hidden' }}>*/}
        {/*    <Toolbar />*/}
        {/*  </Box>*/}
        {/*</Box>*/}
        <Box sx={{ flexGrow: 1 }}>
          <div className="flex flex-col gap-4 p-2">
            <SearchBar setSearchTerm={setSearchTerm}/>
            <Box
                sx={{
                  background: 'linear-gradient(#041a2d, #515f72)',
                  borderRadius: '5px'
                }}
            >
              {/*<div className="float-right mr-2 mt-2">*/}
              {/*  <Dropdown />*/}
              {/*</div>*/}
              <Grid className="flex p-5 pt-7">
                <div className="relative h-36 w-36 justify-center mt-4 rounded-full bg-white">
                  <div className="absolute bottom-0 right-4 z-10">
                    <label
                        htmlFor="profileUpload"
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-yellow-500 font-bold text-black shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      +
                    </label>
                    <input
                        type="file"
                        id="profileUpload"
                        className="hidden"
                        onChange={handleImageUpload}
                    />
                  </div>
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
                <Box className="items-center flex pl-2">
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h4" color="#fff" sx={{ marginBottom: '12px' }}>
                      {name}
                      {/*<Chip sx={{ color: '#bfbdbd', marginLeft: '20px' }} icon={<Face color="#bfbdbd" sx={{ fontSize: '20px', color: '#bfbdbd' }} />} label="23" />*/}
                    </Typography>
                    <Typography variant="subtitle1" component="div" color="#bfbdbd">
                      @{email}
                    </Typography>
                  </CardContent>
                </Box>
              </Grid>
              <Grid className="flex justify-between p-2 text-white">
                <Grid className="flex gap-2">
                  <PopupButton type="followings" token={oktaAuth.getAccessToken()} />
                  <PopupButton type="followers" token={oktaAuth.getAccessToken()} />
                </Grid>
              </Grid>
            </Box>

            <Grid sx={{ flexDirection: 'column' }} className="flex rounded-md border-2 bg-gray-400 p-2 text-white">
              <Grid className="flex justify-center gap-4 rounded-md p-2">
                <button className="rounded-md border-2 p-2">Posts</button>
                <button className="rounded-md border-2 p-2">Liked</button>
              </Grid>

              <Grid className="rounded-md bg-white p-2 md:columns-2 lg:columns-4">
                {posts.map((post, index) => (
                    <div key={index} className="inline-block w-full p-2 relative">
                      <Link to={`/post/${post.postId}`}>
                        <ProfileCard
                            type={post.mediaType}
                            src={post.mediaUrl}
                            title={post.title}
                            previewText={post.text}
                        />
                      </Link>
                      {
                        editStatus ? <Fab
                            variant="extended"
                            sx={{
                              position: 'absolute',
                              left: '20px',
                              top: '20px',
                              width: '20px',
                              opacity: '0.5',
                              zIndex: '10'
                            }}
                            aria-label="edit"
                            onClick={() => handleClickOpen(post)}
                        >
                          <EditIcon />
                        </Fab> : ''
                      }
                    </div>
                ))}
                <Zoom
                    key={fab.color}
                    in={true}
                    timeout={transitionDuration}
                    style={{
                      transitionDelay: `${transitionDuration.exit}ms`,
                    }}
                    unmountOnExit
                >
                  <Fab sx={fab.sx} aria-label={fab.label} color={fab.color} onClick={handleEditStatus}>
                    {fab.icon}
                  </Fab>
                </Zoom>
                <PostEdit post={editPost} open={open} handleClose={handleClose}/>
              </Grid>
            </Grid>
          </div>
        </Box>
      </Box>
  );

};

export default UserInfoPage;
