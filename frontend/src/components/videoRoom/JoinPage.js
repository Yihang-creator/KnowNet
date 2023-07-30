import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Snackbar, Alert } from '@mui/material';
import Backend from './Backend';
import JoinVideoRoom from './JoinVideoRoom';
import Layout from '../mainPage/Layout';
import { useUserContext } from '../../auth/UserContext';

function JoinPage() {
	const [backend] = useState(() => new Backend());
	const [roomId, setRoomId] = useState('');
	const [url, setUrl] = useState('');
	const { userInfo } = useUserContext();
	const { username } = userInfo;
	const [roomSet, setRoomSet] = useState(false);
	const [isJoin, setIsJoin] = useState(false);
	const [duration, setDuration] = useState(0);
	const [playing, setPlaying] = useState(false);
	const [chats, setChats] = useState([]);
	const [errorOpen, setErrorOpen] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	
	useEffect(() => {
		backend.socket.on('room-created', (roomId) => {
			setRoomId(roomId);
			setRoomSet(true);
			setDuration(0);
			setPlaying(false);
			setIsJoin(false);
			backend.setRoomId(roomId);
		});

		backend.socket.on('room-state', (roomInfo) => {
			setRoomId(roomInfo.roomId);
			setUrl(roomInfo.url);
			setRoomSet(true);
			setDuration(roomInfo.duration);
			setPlaying(roomInfo.playing);
			setIsJoin(true);
			setChats(roomInfo.chats);
		});

		backend.socket.on('error', (errMsg) => {
			setErrorMsg(errMsg);
			setErrorOpen(true);
		});

		return () => {
			backend.socket.off('room-created');
			backend.socket.off('room-state');
			backend.socket.off('error');
			backend.socket.disconnect();
		};
	}, [backend]);

	const createRoom = () => {
		backend.socket.emit('username', username);
		backend.createRoom({
			url: url,
			playing: false,
			duration: 0,
			name: username,
			chats: [],
		});
	};

	const joinRoom = () => {
		backend.socket.emit('username', username);
		backend.joinRoom(roomId);
		backend.setRoomId(roomId);
	};

	if (roomSet) {
		return (
			<Layout>
				<JoinVideoRoom
					backend={backend}
					url={url}
					duration={duration}
					is_join={isJoin}
					playing={playing}
					chats={chats}
					username={username}
				/>
			</Layout>
		);
	}

	const handleErrorMsgClose = () => {
		setErrorOpen(false);
		setErrorMsg('');
	}

	const content = (
		<div className="flex flex-col items-center">
			<Typography variant="h5" className="mb-3 items-center justify-center">
				Watch Video Together
			</Typography>
			<TextField
				label="Video Address"
				variant="outlined"
				onChange={(e) => setUrl(e.target.value)}
				className="w-1/2"
				style={{ marginTop: '8px', marginBottom: '8px' }}
			/>
			<Button
				variant="contained"
				color="primary"
				onClick={createRoom}
				className="mb-4 w-1/2"
			>
				Start Party
			</Button>
			<TextField
				label="Room ID"
				variant="outlined"
				onChange={(e) => setRoomId(e.target.value)}
				className="w-1/2"
				style={{ marginTop: '8px', marginBottom: '8px' }}
			/>
			<Button
				variant="contained"
				color="primary"
				onClick={joinRoom}
				className="w-1/2"
			>
				Join Party
			</Button>
			<Snackbar open={errorOpen} autoHideDuration={4000} onClose={handleErrorMsgClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
				<Alert onClose={handleErrorMsgClose} severity="error" sx={{ width: '100%' }}>
					{errorMsg}
				</Alert>
    	</Snackbar>
		</div>
	);

	return (
		<div>
			<Layout>{content}</Layout>
		</div>
	);
}

export default JoinPage;
