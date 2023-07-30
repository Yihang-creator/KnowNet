import React, { useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Link } from 'react-router-dom';
import {
  MenuItem,
  Menu,
  Avatar,
  IconButton,
  Tooltip,
  Box,
} from '@mui/material';
import { useUserContext } from '../../auth/UserContext';
import '../../Styles/Dropdown.css';

const Dropdown = () => {
  const { authState, oktaAuth } = useOktaAuth();

  const [open, setOpen] = useState(false);

  const login = async () => oktaAuth.signInWithRedirect();
  const logout = async () => oktaAuth.signOut();

  const { userInfo } = useUserContext();

  const user_image = userInfo == null ? null : userInfo.userPhotoUrl;

  if (!authState) {
    return null;
  }

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={() => setOpen(true)} sx={{ p: 0 }}>
          <Avatar alt="Null" src={user_image} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={open}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(open)}
        onClose={() => setOpen(false)}
      >
        {authState.isAuthenticated ? (
          [
            <Link key="Home" to="/">
              <DropdownItem
                img={
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLKy76cSh3Cu_SzL-P8aA_U8Uw0th_7cgnHA&usqp=CAU'
                }
                text={'Home'}
              />
            </Link>,
            <DropdownItem
              key="logout"
              img={
                'https://static.vecteezy.com/system/resources/previews/000/575/503/original/vector-logout-sign-icon.jpg'
              }
              text={'Log Out'}
              onClick={logout}
            />,
          ]
        ) : (
          <DropdownItem
            key="login"
            img={user_image}
            text={'Log In'}
            onClick={login}
          />
        )}
      </Menu>
    </Box>
  );
};

function DropdownItem(props) {
  return (
    <MenuItem className="dropdownItem" onClick={props.onClick}>
      <img src={props.img} alt=""></img>
      <span> {props.text} </span>
    </MenuItem>
  );
}

export default Dropdown;
