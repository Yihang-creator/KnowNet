import React from 'react';
import ReactPlayer from 'react-player';

const ProfileResource = (props) => {
	if (props.type === 'image') {
		return (
			// eslint-disable-next-line jsx-a11y/img-redundant-alt
			<img
				className="h-3/5 w-full"
				src={props.link}
				alt="Image Not Avaliable"
			/>
		);
	} else {
		return (
			<div className="h-3/5 w-full">
				<ReactPlayer
					url={props.link}
					width="100%"
					height="100%"
					controls={false}
					config={{
						// https://developers.google.com/youtube/player_parameters?playerVersion=HTML5
						youtube: {
							playerVars: {
								controls: 0,
								disablekb: 1,
							},
						},
					}}
				/>
			</div>
		);
	}
};
export default ProfileResource;
