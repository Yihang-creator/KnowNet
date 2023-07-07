import io from 'socket.io-client';

class Backend {
    constructor() {
        this.state = { 
            roomId: ""
        };
        this.socket = io('', {
            path: '/socket/videoRoom'
        });
    }

    createRoom(room_info) {
        this.socket.emit('create-room', room_info);
    }

    joinRoom(roomId) {
        this.socket.emit('join-room', roomId);
    }

    togglePlay(state) {
        this.socket.emit('toggle-play', this.state.roomId, state);
    }

    setURL(url) {
        this.socket.emit('set-url', this.state.roomId, url);
    }

    setSeek(time) {
        this.socket.emit('set-seek', this.state.roomId, time);
    }

    addChat(message) {
        this.socket.emit('add-chat', this.state.roomId, message);
    }

    addVideo(video) {
        this.socket.emit('add-video', this.state.roomId, video);
    }

    setRoomId(roomId) {
        this.state.roomId = roomId;
    }
}

export default Backend;