import React from "react";
import { Button, TextField, Typography } from '@mui/material';
import Backend from "./Backend";
import JoinVideoRoom from "./JoinVideoRoom";
import Layout from "../mainPage/Layout";

class JoinPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            backend: new Backend(),
            roomId: '',
            url: '',
            username: 'Anonymous',
            room_set: false,
            is_join: false,
            duration: 0,
            playing: false,
            chats: []
        };
    }

    componentDidMount() {
        this.state.backend.socket.on('room-created', (roomId) => {
            this.setState({ roomId: roomId, room_set: true, duration: 0, playing: false, is_join: false });
            this.state.backend.setRoomId(roomId);
            console.log(`room created with id ${roomId}`);
        });

        this.state.backend.socket.on('room-state', (roomInfo) => {
            this.setState({ roomId: roomInfo.roomId, name: roomInfo.name, url: roomInfo.url, room_set: true, duration: roomInfo.duration, playing: roomInfo.playing, is_join: true, chats: roomInfo.chats});
        });
    }


    createRoom = () => {
        this.state.backend.socket.emit('username', this.state.username);
        this.state.backend.createRoom(
            {   
                url: this.state.url,
                playing: false,
                duration: 0,
                name: this.state.name,
                chats: []
            });

    };

    joinRoom = () => {
        this.state.backend.socket.emit('username', this.state.username);
        this.state.backend.joinRoom(this.state.roomId);
        this.state.backend.setRoomId(this.state.roomId);
    };

    render() {

        if (this.state.room_set) {
            return (
                <Layout>
                    <JoinVideoRoom backend={this.state.backend} url={this.state.url} duration={this.state.duration} is_join={this.state.is_join} playing={this.state.playing} chats={this.state.chats} username={this.state.username}/>
                </Layout>
            );
        }

        const content = (
            <div className="flex flex-col items-center">
                <Typography variant="h5" className="mb-3 items-center justify-center">Watch Video Together</Typography>
                <TextField
                    label="Username"
                    variant="outlined"
                    onChange={(e) => this.setState({ username: e.target.value })}
                    className="mb-4 w-1/2"
                />
                <TextField
                    label="Video Address"
                    variant="outlined"
                    onChange={(e) => this.setState({ url: e.target.value })}
                    className="mb-4 w-1/2"
                />
                <Button variant="contained" color="primary" onClick={this.createRoom} className="mb-4 w-1/2">
                    Start Party
                </Button>
                <TextField
                    label="Room ID"
                    variant="outlined"
                    onChange={(e) => this.setState({ roomId: e.target.value })}
                    className="mb-4 w-1/2"
                />
                <Button variant="contained" color="primary" onClick={this.joinRoom} className="w-1/2">
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
}

export default JoinPage;