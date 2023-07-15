import { Avatar } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import React from "react";
import { useDispatch } from "react-redux";
import { follow } from "../redux/actions/userActions";

const AccountCard = ({
  name,
  url,
  description,
  userId,
  type,
  status,
  token,
  myId,
}) => {
  const [selected, setSelected] = React.useState(status);

  const dispatch = useDispatch();
  return (
    <div className="flex flex-row justify-between text-white">
      <div className="flex flex-row gap-4">
        <Avatar alt={name} src={url} sx={{ width: 64, height: 64 }} />

        <div className="flex flex-col border-2">
          <span> {name} </span>
          <span> {description}</span>
        </div>
      </div>

      <div className="self-center border-2">
        <ToggleButton
          selected={selected === "following"}
          onChange={() => {
            let operation = selected === "following" ? "unfollow" : "follow";
            dispatch(follow(myId, userId, operation, type, token));
            setSelected(selected === "following" ? "unfollowing" : "following");
          }}
          sx={{ width: 96, height: 48 }}
        >
          <span>{selected === "following" ? "Following" : "Follow"}</span>
        </ToggleButton>
      </div>
    </div>
  );
};

export default AccountCard;
