import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { useOktaAuth } from '@okta/okta-react';
import { Menu, Avatar, Box } from '@mui/material';
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
      <Link to={`/profile/${userInfo?.userId}`}>
        <Avatar alt="Null" src={user_image} />
      </Link>
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
