import React from 'react';
import {
  CardMedia,
  Card,
  Typography,
  CardActionArea,
  CardContent,
  Avatar,
} from '@mui/material';
import Resource from './Resource';
import '../../Styles/PreviewCard.css';

// overflow auto to enable scrolling if title is too long
const PreviewCard = (props) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia>
          <Resource type={props.type} link={props.src} className=" w-full" />
        </CardMedia>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ overflow: 'auto' }}
          >
            {props.title}
          </Typography>
          <Typography
            variant="caption"
            className="text-gary flex items-center"
            sx={{ marginTop: '10px' }}
          >
            <Avatar
              alt=""
              src={props.userPhotoUrl}
              className="mr-2"
              sx={{ width: '20px', height: '20px', overflow: 'auto' }}
            />
            {props.username}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default React.memo(PreviewCard);
