import React, { useState } from "react";
import {
  Box,
  Modal,
  Grid,
  List,
} from '@mui/material';
import AccountCard from "../AccountCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchFollowingsAndFollowers,
  updateFollowings,
} from "../../redux/actions/userActions";
import {useOktaAuth} from "@okta/okta-react";
import {useUserContext} from "../../auth/UserContext";
const PopupButton = ({ type, token }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { authState } = useOktaAuth();
  const { userInfo } = useUserContext();
  const { userId } = userInfo;

  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => setIsOpen(true);

  useEffect(() => {
    if (!isOpen) {
      dispatch(fetchFollowingsAndFollowers(userId, token));
    }
  }, [isOpen]);

  const users = useSelector((state) => state.userReducer[type]);

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
    borderRadius: '10px'
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
            <List sx={{ width: '100%', maxWidth: 460, bgcolor: 'background.paper' }}>
              {users.map((user) => {
                return (
                    <Grid>
                      <AccountCard
                          name={user.username}
                          description={user.email}
                          userId={user.userId}
                          url={user.userPhotoUrl}
                          type={type}
                          status={user.status}
                          token={token}
                          myId={userId}
                      />
                    </Grid>
                );
              })}
            </List>
          </Box>
        </Modal>
      </div>
  );
};

export default PopupButton;
