import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import HomeIcon from '@mui/icons-material/Home';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ChatIcon from '@mui/icons-material/Chat';
import { Link } from 'react-router-dom';
import CreatePostButton from './CreatePostButton';
import { useTheme } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useUserContext } from '../../auth/UserContext';
import { useOktaAuth } from '@okta/okta-react';
import { useSearchContext } from './searchContext';

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const theme = useTheme();
  const { userInfo } = useUserContext();
  const { oktaAuth } = useOktaAuth();
  const logout = async () => oktaAuth.signOut();
  const { setSearchTerm, setSearchByTag, setLocalSearchTerm, setChecked } =
    useSearchContext();

  const clearSearch = () => {
    setSearchTerm('');
    setSearchByTag(false);
    setLocalSearchTerm('');
    setChecked(false);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <Link to={`/`}>
          <ListItem key={'Home'} disablePadding>
            <ListItemButton onClick={clearSearch}>
              <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText
                primary={'Home'}
                sx={{ color: theme.palette.text.primary }}
              />
            </ListItemButton>
          </ListItem>
        </Link>
        <CreatePostButton />
        <Link to={`/joinVideoRoom`} className="group">
          <ListItem key={'Video Room'} disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                <YouTubeIcon />
              </ListItemIcon>
              <ListItemText
                primary={'Video Room'}
                sx={{ color: theme.palette.text.primary }}
              />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to={`/chat/${userInfo.userId}`} className="chats">
          <ListItem key={'Chats'} disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                <ChatIcon />
              </ListItemIcon>
              <ListItemText
                primary={'Chats'}
                sx={{ color: theme.palette.text.primary }}
              />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link to={`/profile/${userInfo.userId}`} className="group">
          <ListItem key={'Profile'} disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText
                primary={'Profile'}
                sx={{ color: theme.palette.text.primary }}
              />
            </ListItemButton>
          </ListItem>
        </Link>

        <div onClick={logout}>
          <ListItem key={'Logout'} disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText
                primary={'Logout'}
                sx={{ color: theme.palette.text.primary }}
              />
            </ListItemButton>
          </ListItem>
        </div>
      </List>
    </div>
  );

  //setting zIndex to 900 make left bar appear under topbar
  return (
    <Box sx={{ display: 'flex', zIndex: 900 }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="permanent"
          sx={{
            zIndex: 900,
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
