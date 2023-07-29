import React from "react";
import {
    CardMedia,
    Card,
    Typography,
    CardActionArea,
    CardContent,
    Avatar
} from '@mui/material';
import Resource from "./Resource";
import "../../Styles/PreviewCard.css";

const PreviewCard = (props) => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia>
                    <Resource type={props.type} link={props.src} className=" w-full" />
                </CardMedia>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {/*TODO: add preview text*/}
                        {/* {props.previewText || 'intro...'} */}
                    </Typography>
                    <Typography variant="caption" className="text-gary flex items-center" sx={{ marginTop: '10px' }} >
                        <Avatar alt="" src={props.userPhotoUrl} className="mr-2" sx={{ width: '20px', height: '20px' }} />
                        {props.username}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default PreviewCard;
