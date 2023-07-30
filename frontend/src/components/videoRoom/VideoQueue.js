import {
	ListItemButton,
	ListItemText,
	ListItemIcon,
	List,
	ListItem,
	Typography,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import YouTubeIcon from '@mui/icons-material/YouTube';

const VideoQueue = (props) => {
	const [queue, setQueue] = useState([]);
	const [current, setCurrent] = useState(0);
	const { changeVideo, is_join = false, backend } = props;

	useEffect(() => {
		backend.socket.on('update-queue', (newQueue) => {
			setQueue(newQueue);
		});

		return () => {
			// Clean up the socket listener on component unmount
			backend.socket.off('update-queue');
		};
	}, [backend.socket]);

	const makeList = () => {
		return queue.map((vid, idx) => {
			return (
				<ListItem
					key={idx}
					onClick={() => {
						if (!is_join) {
							setCurrent(idx);
							changeVideo(vid);
						}
					}}
					disablePadding
				>
					<ListItemButton
						selected={current === idx}
						onClick={() => setCurrent(idx)}
					>
						<ListItemIcon>
							<YouTubeIcon />
						</ListItemIcon>
						<ListItemText primary={vid.toString().substring(0, 50)} />
					</ListItemButton>
				</ListItem>
			);
		});
	};

	return (
		<>
			<Typography variant="h5" fontWeight="bold" mt={2}>
				Video Queue
			</Typography>
			<List>{makeList()}</List>
		</>
	);
};

export default VideoQueue;
