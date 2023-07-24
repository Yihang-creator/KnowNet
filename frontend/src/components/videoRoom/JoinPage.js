import React, { useState, useEffect } from "react";
import { Button, TextField, Typography } from '@mui/material';
import Backend from "./Backend";
import JoinVideoRoom from "./JoinVideoRoom";
import Layout from "../mainPage/Layout";

function JoinPage() {
    const [backend] = useState(() => new Backend());
    const [roomId, setRoomId] = useState('');
    const [url, setUrl] = useState('');
    const [username, setUsername] = useState('Anonymous');
    const [roomSet, setRoomSet] = useState(false);
    const [isJoin, setIsJoin] = useState(false);
    const [duration, setDuration] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [chats, setChats] = useState([]);

    useEffect(() => {
        backend.socket.on('room-created', (roomId) => {
            setRoomId(roomId);
            setRoomSet(true);
            setDuration(0);
            setPlaying(false);
            setIsJoin(false);
            backend.setRoomId(roomId);
            console.log(`room created with id ${roomId}`);
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

        // this is to mimic componentWillUnmount lifecycle hook to clean up when the component unmounts
        return () => {
            backend.socket.off('room-created');
            backend.socket.off('room-state');
            backend.socket.disconnect();
        }
    }, [backend]);

    const createRoom = () => {
        backend.socket.emit('username', username);
        backend.createRoom(
            {   
                url: url,
                playing: false,
                duration: 0,
                name: username,
                chats: []
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
                <JoinVideoRoom backend={backend} url={url} duration={duration} is_join={isJoin} playing={playing} chats={chats} username={username}/>
            </Layout>
        );
    }

    const content = (
        <div className="flex flex-col items-center">
            <Typography variant="h5" className="mb-3 items-center justify-center">Watch Video Together</Typography>
            <TextField
                label="Username"
                variant="outlined"
                onChange={(e) => setUsername(e.target.value)}
                className="w-1/2"
                style={{ marginTop: '8px', marginBottom: '8px' }}
            />
            <TextField
                label="Video Address"
                variant="outlined"
                onChange={(e) => setUrl(e.target.value)}
                className="w-1/2"
                style={{ marginTop: '8px', marginBottom: '8px' }}
            />
            <Button variant="contained" color="primary" onClick={createRoom} className="mb-4 w-1/2">
                Start Party
            </Button>
            <TextField
                label="Room ID"
                variant="outlined"
                onChange={(e) => setRoomId(e.target.value)}
                className="w-1/2"
                style={{ marginTop: '8px', marginBottom: '8px' }}
            />
            <Button variant="contained" color="primary" onClick={joinRoom} className="w-1/2">
                Join Party
            </Button>
        </div>
    );

    return (
    <div>
        <Layout>
            {content}
        </Layout>
    </div>
  )
}

export default JoinPage;
