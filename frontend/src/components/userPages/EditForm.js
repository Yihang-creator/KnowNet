import React, { useState } from 'react';
import { Box, Modal } from '@mui/material';
import { useUserContext } from '../../auth/UserContext';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useOktaAuth } from '@okta/okta-react';

const EditForm = ({ setUserInfo, setSelectedImage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { userInfo, setUserInfo: setCurrentUserInfo } = useUserContext();
  const { userId } = userInfo;
  const [textFieldValue1, setTextFieldValue1] = useState('');
  const [textFieldValue2, setTextFieldValue2] = useState('');
  const { oktaAuth } = useOktaAuth();

  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => setIsOpen(true);

  const edit = function (userId, newName, newImage, token) {
    fetch(`/api/users/${userId}/edit`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({ name: newName, image: newImage }),
    })
      .then((response) => response.json())
      .then(() => {
        if (newName) {
          setUserInfo(prevInfo => ({
            ...prevInfo,
            username: newName }));
          setCurrentUserInfo(prevInfo => ({
            ...prevInfo,
            username: newName }));
        }
        if (newImage) {
          setSelectedImage(newImage);
          setCurrentUserInfo(prevInfo => ({
            ...prevInfo,
            userPhotoUrl: newImage }));
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  function handleSubmit(e) {
    edit(userId, textFieldValue1, textFieldValue2, oktaAuth.getAccessToken());
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
        <span className="rounded-md border-2 p-2">Edit</span>
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
            Edit your account information below
          </h2>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="New Name"
            type="text"
            fullWidth
            value={textFieldValue1}
            onChange={(e) => setTextFieldValue1(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="New Avatar"
            type="text"
            fullWidth
            value={textFieldValue2}
            onChange={(e) => setTextFieldValue2(e.target.value)}
          />
          <Button variant="contained" onClick={handleSubmit}>
            Confirm
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default EditForm;
