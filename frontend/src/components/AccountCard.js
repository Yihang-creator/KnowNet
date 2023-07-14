import { Avatar } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import React from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/actions/userActions";

const AccountCard = ({ name, url, email, userId }) => {
  const [selected, setSelected] = React.useState(true);
  const dispatch = useDispatch();
  return (
    <div className="flex flex-row justify-between text-white">
      <div className="flex flex-row gap-4">
        <Avatar alt={name} src={url} sx={{ width: 64, height: 64 }} />

        <div className="flex flex-col border-2">
          <span> {name} </span>
          <span> {email}</span>
        </div>
      </div>

      <div className="self-center border-2">
        <ToggleButton
          selected={selected}
          onChange={() => {
            dispatch(updateUser(userId));

            setSelected(!selected);
          }}
          sx={{ width: 96, height: 48 }}
        >
          <span>{selected ? "Following" : "Follow"}</span>
        </ToggleButton>
      </div>
    </div>
  );
};

export default AccountCard;
