import React, { useState } from 'react';
import { Box, Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getBlockTags } from '../../redux/actions/userActions';
import { useUserContext } from '../../auth/UserContext';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useOktaAuth } from '@okta/okta-react';

const BlockedTags = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { userInfo } = useUserContext();
  const { userId } = userInfo;
  const [textFieldValue, setTextFieldValue] = useState('');
  const { oktaAuth } = useOktaAuth();

  const convertTagsToString = function (tags) {
    let string = '';
    if (!tags || tags.length === 0) return string;
    for (let tag of tags) {
      string = string + ' ' + tag;
    }
    return string;
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => setIsOpen(true);

  useEffect(() => {
    if (!isOpen) {
      dispatch(getBlockTags(userId, oktaAuth.getAccessToken()));
    }
  }, [dispatch, isOpen, oktaAuth, userId]);

  const tags = useSelector((state) => state.userReducer.blockedTags);

  useEffect(() => {
    setTextFieldValue(convertTagsToString(tags));
  }, [tags]);

  if (!tags) {
    return <div> Loading ...</div>;
  }

  const addBlockTags = function (userId, tags, token) {
    fetch(`/api/users/${userId}/block`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({ userId: userId, blockedTags: tags }),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  function handleSubmit(e) {
    addBlockTags(
      userId,
      textFieldValue.trim().split(' '),
      oktaAuth.getAccessToken(),
    );
    closeModal();
    e.preventDefault();
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
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
        <span className="rounded-md border-2 p-2">Blocked Tags</span>
      </button>

      <Modal
        open={isOpen}
        onClose={closeModal}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <h2
            style={{
              color: 'orange',
            }}
          >
            Enter the tags you want to block and separate them by space.
          </h2>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Enter Text"
            type="text"
            fullWidth
            value={textFieldValue}
            onChange={(e) => setTextFieldValue(e.target.value)}
          />
          <Button variant="contained" onClick={handleSubmit}>
            Confirm
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default BlockedTags;
