import React, { useState, useEffect, useCallback, useRef } from 'react';
import ReactPlayer from 'react-player';
import { Button, Box, ButtonGroup } from '@mui/material';
import { useOktaAuth } from '@okta/okta-react';

export default function InteractiveVideo(props) {
	const { postId, rootId } = props;
	const [videoData, setVideoData] = useState(null);
	const [showOptions, setShowOptions] = useState(false);
	const [duration, setDuration] = useState(0);
	const { oktaAuth } = useOktaAuth();
	const [muted, setMuted] = useState(true);
	const playerRef = useRef(null);

	const fetchVideoData = useCallback(
		async (id) => {
			const response = await fetch(
				`/api/posts/${postId}/interactiveVideo/${id}`,
				{
					headers: { Authorization: 'Bearer ' + oktaAuth.getAccessToken() },
				}
			);
			const data = await response.json();
			setVideoData(data);
			setShowOptions(false);
		},
		[oktaAuth, postId]
	);

	useEffect(() => {
		// Fetch the first video on initial render
		fetchVideoData(rootId);
	}, [fetchVideoData, rootId]);

	const handleProgress = ({ playedSeconds }) => {
		// If there's less than LeadTimeField seconds left in the video, show the options
		if (duration - playedSeconds <= videoData.LeadTimeField) {
			setShowOptions(true);
		} else {
			setMuted(false); // this is a workaround to start the video automatically
			setShowOptions(false);
		}
	};

	const handleDuration = (dur) => {
		setDuration(dur);
	};

	const handleOptionClick = (nextVideoId) => {
		fetchVideoData(nextVideoId);
	};

	if (!videoData) return 'Loading...';

	return (
		<Box className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 ">
			<ReactPlayer
				ref={playerRef}
				playing={videoData.root === false} //non-root video starts automatically
				muted={muted}
				url={videoData.url}
				onProgress={handleProgress}
				onDuration={handleDuration}
				config={{
					// https://developers.google.com/youtube/player_parameters?playerVersion=HTML5
					youtube: {
						playerVars: {
							controls: 1,
							disablekb: 1,
							modestbranding: 1,
							mute: 1,
						},
					},
				}}
			/>
			{showOptions && (
				<ButtonGroup variant="outlined">
					{videoData.options.map((option) => (
						<Button
							key={option.nextVideoId}
							onClick={() => handleOptionClick(option.nextVideoId)}
						>
							{option.label}
						</Button>
					))}
				</ButtonGroup>
			)}
		</Box>
	);
}
