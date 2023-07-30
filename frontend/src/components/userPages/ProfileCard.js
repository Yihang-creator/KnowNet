import React from 'react';
import {
	CardMedia,
	Card,
	Typography,
	CardActionArea,
	CardContent,
} from '@mui/material';
import ProfileResource from './ProfileResource';

const ProfileCard = (props) => {
	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardActionArea>
				<CardMedia>
					<ProfileResource
						type={props.type}
						link={props.src}
						className=" w-full"
					/>
				</CardMedia>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{props.title}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};
export default ProfileCard;
