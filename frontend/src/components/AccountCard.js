import { Avatar } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import React from "react";
import { useDispatch } from "react-redux";
import { toggleFollowingAndFollowers } from "../redux/actions/userActions";

const AccountCard = ({ name, url, description, userId, type, status }) => {
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
            dispatch(toggleFollowingAndFollowers(userId, type));

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
