import React, { useEffect, useState } from 'react';
import { Box, Grid, List, Modal, Alert, Snackbar } from '@mui/material';
import AccountCard from './AccountCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFollowingsAndFollowers } from '../../redux/actions/userActions';

const PopupButton = ({ type, token, isSelf, userInfo, selected }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [ipTipOpen, setTipOpen] = useState(false);
  const [tipMessage, setTipMessage] = useState('')

  const { userId } = userInfo;

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    if(users.length === 0) {
      setTipMessage(type === 'followings' ? 'not following anyone' : 'no followers')
      setTipOpen(true)
    } else {
      setIsOpen(true);
    }
  }

  const handleClose = () => {
    setTipOpen(false)
  }

  const users = useSelector((state) => state.userReducer[type]);

  useEffect(() => {
    if (!isOpen && userId) {
      dispatch(fetchFollowingsAndFollowers(userId, token));
    }
  }, [dispatch, isOpen, token, userId]);

  useEffect(() => {
    userId && dispatch(fetchFollowingsAndFollowers(userId, token));
  }, [dispatch, selected, token, userId]);

  if (!users) {
    return <div> Loading ...</div>;
  }
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    maxHeight: '60vh',
    overflow: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px',
  };
  return (
    <div className="p-6">
      <button
        className="flex flex-col items-center p-2 text-white"
        onClick={openModal}
      >
        <span>{users.length}</span>
        <span>{type}</span>
      </button>

      <Modal
        open={isOpen}
        onClose={closeModal}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <List
            sx={{ width: '100%', maxWidth: 460, bgcolor: 'background.paper' }}
          >
            {users.map((user) => {
              return (
                <Grid key={user.userId}>
                  <AccountCard
                    name={user.username}
                    description={user.email}
                    userId={user.userId}
                    url={user.userPhotoUrl}
                    type={type}
                    status={user.status}
                    token={token}
                    myId={userId}
                    isSelf={isSelf}
                  />
                </Grid>
              );
            })}
          </List>
        </Box>
      </Modal>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={ipTipOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
          {tipMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default PopupButton;
