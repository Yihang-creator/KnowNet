import React, { useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import {
  Menu,
  Avatar,
  IconButton,
  Tooltip,
  Box,
} from '@mui/material';
import { useUserContext } from '../../auth/UserContext';
import '../../Styles/Dropdown.css';

const Dropdown = () => {
  const { authState } = useOktaAuth();

  const [open, setOpen] = useState(false);

  const { userInfo } = useUserContext();

  const user_image = userInfo == null ? null : userInfo.userPhotoUrl;

  if (!authState) {
    return null;
  }

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton sx={{ p: 0 }}>
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
      </Menu>
    </Box>
  );
};

export default Dropdown;
