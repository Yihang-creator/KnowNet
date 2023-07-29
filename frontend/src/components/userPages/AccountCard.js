import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import {
    Typography,
    Avatar,
    ListItemAvatar,
    ListItem,
    ListItemText,
    Divider,
    ListItemButton
} from '@mui/material';
import { useDispatch } from "react-redux";
import { follow } from "../../redux/actions/userActions";

const AccountCard = ({
                         name,
                         url,
                         description,
                         userId,
                         type,
                         status,
                         token,
                         myId,
                         isSelf
                     }) => {
    const [selected, setSelected] = React.useState(status);

    const dispatch = useDispatch();
    return (
        <React.Fragment>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt={name} src={url}/>
                </ListItemAvatar>
                <ListItemText
                    primary={name}
                    sx={{
                        width: '60%',
                        overflow: 'hidden',
                    }}
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                {description}
                            </Typography>
                        </React.Fragment>
                    }
                />
                {
                    isSelf ? <ListItemButton
                        sx={{ justifyContent: 'center' }}
                    >
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
                    </ListItemButton> : ''
                }
            </ListItem>
            <Divider variant="inset" component="li" />
        </React.Fragment>
    );
};

export default AccountCard;
