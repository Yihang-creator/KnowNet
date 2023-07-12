import React from 'react';
import ReactPlayer from 'react-player';
import VideoQueue from './VideoQueue';
import { Button, TextField, Divider } from '@mui/material';


const userColors = [
    '#000000', // Black
  '#FF0000', // Red
  '#00FF00', // Green
  '#0000FF', // Blue
  '#FFA500', // Orange
  '#FFFF00', // Yellow
  '#800080', // Purple
  '#FFC0CB', // Pink
  '#00FFFF', // Cyan
  '#FF69B4', // Hot Pink
  '#008000', // Dark Green
  '#800000', // Maroon
  '#000080', // Navy
  '#FF4500', // Orange Red
  '#9400D3', // Dark Violet
  '#4B0082', // Indigo
  '#2E8B57', // Sea Green
  '#BA55D3', // Medium Orchid
  '#4682B4', // Steel Blue
  '#8B0000', // Dark Red
  ];

class JoinVideoRoom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            duration: props.duration,
            url: props.url || 'https://www.youtube.com/watch?v=QZw-rgaQVfI',
            is_join: props.is_join || false,
            playing: props.playing,
            backend: props.backend,
            add_url: '',
            chats: props.chats,
            cur_msg: "",
            userColorMap: new Map()
        };

        this.ref = React.createRef();
        this.chatRef = React.createRef();
    }

    componentDidMount() {
        this.state.backend.socket.on('set-url', url => {
            this.setState({ url: url });
        });

        this.state.backend.socket.on('play-toggled', (state) => {
            this.setState({ playing: state});
        });

        this.state.backend.socket.on('url-set', (url) => {
            this.setState({url: url});
        });

        this.state.backend.socket.on('seek-set', (duration) => {
            console.log(duration);
            if (Math.abs(duration - this.state.duration) > 2) {
                this.setState({duration: duration});
            } 
            
        });

        this.state.backend.socket.on('chat-added', (message) => {
            this.setState(prevState => ({ chats: [...prevState.chats, message] }));
        });
        
    }

    componentDidUpdate(prevProps, prevState) {
        if ((Math.abs(this.state.duration - prevState.duration)) > 2) {
            this.ref.current.seekTo(this.state.duration, 'seconds');
        }
        this.scrollToBottom();
    }

    scrollToBottom = () => {
        this.chatRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    handleKeyDown = (evt) => {
        if(evt.key === "Enter" && this.state.cur_msg.trim() !== ""){
            this.state.backend.addChat({
                text: this.state.cur_msg.trim(),
                time: new Date()
            });
            this.setState({ cur_msg: "" });
            evt.preventDefault();
        }
    }

    playVideo = () => {
        this.state.backend.togglePlay(true);
    };

    onPlay = () => {
        if (!this.state.is_join) {
            this.playVideo();
        }
    };

    onPause = () => {
        if (!this.state.is_join) {
            this.state.backend.togglePlay(false);
        }
    };

    onProgress = (dur) => {
        this.setState({duration: dur['playedSeconds']});
        if(!this.state.is_join) {
            this.state.backend.setSeek(dur['playedSeconds']);
        }
    }

    onSeek = (seconds) => {
        // console.log(`on seek ${seconds}`);
        this.setState({duration: seconds});
        this.state.backend.setSeek(seconds);
    }


    onBuffer = () => {
        console.log("User is buffering...");
    }

    onReady = () => {
        if (this.state.is_join) {
            this.ref.current.seekTo(this.state.duration, 'seconds');
        }
    }

    handleAddUrlChange = (event) => {
        this.setState({ add_url: event.target.value });
    }

    addVideo = () => {
        this.state.backend.addVideo(this.state.add_url);
        this.setState({add_url:''});
    }

    render() {

        let queue_control = '';
        if (!this.state.is_join) {
            queue_control = (
                <div className="text-white font-bold py-2 px-4 rounded border-2 border-white">
                    <TextField
                        variant="outlined"
                        fullWidth
                        value={this.state.add_url}
                        onChange={this.handleAddUrlChange}
                        placeholder="Video URL"
                        InputProps={{
                            style: { color: 'white' }
                          }}
                    />
                    <Button variant="contained" color="primary" onClick={this.addVideo}>
                        Add Video Url
                    </Button>
                </div>
            );
        }

        const getUserColor = (user) => {
            // Check if the user already has a color assigned
            if (this.state.userColorMap.has(user)) {
              return this.state.userColorMap.get(user); // Return the existing color for the user
            } else {
              // Generate a new color for the user
              const colorIndex = Math.floor(Math.random() * userColors.length);
              const userColor = userColors[colorIndex];
          
              // Store the new user-color mapping in the map
              this.state.userColorMap.set(user, userColor);
          
              return userColor;
            }
          };

        return (
            <div className="flex flex-row items-center justify-center min-h-screen bg-gray-900 p-5 text-white h-64">
                <div className="container max-w-4xl mx-auto pt-6 px-3 bg-gray-800 rounded shadow-xl">
                <div className="text-2xl font-bold mb-4">Room ID: {this.state.backend.state.roomId}</div>
                <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-md shadow-lg mb-4">
                    <ReactPlayer
                    ref={this.ref}
                    url={this.state.url}
                    controls={!this.state.is_join} // Only host can control
                    light={false}
                    onPlay={this.onPlay}
                    onPause={this.onPause}
                    onBuffer={this.onBuffer}
                    onProgress={this.onProgress}
                    playing={this.state.playing}
                    onSeek={this.onSeek}
                    onReady={this.onReady}
                    width='100%'
                    />
                </div>
                <div className="flex flex-row">
                    <div className="w-1/2 pr-2">
                    <div className="mb-4">
                        {queue_control}
                    </div>
                    <div className="w-full">
                        <VideoQueue 
                        changeVideo={(vid)=>{
                            this.state.backend.setURL(vid);
                        }}
                        backend={this.state.backend}
                        is_join={this.state.is_join}
                        />
                    </div>
                    </div>
                </div>
                </div>
                <Divider variant='middle'/>
                <div className="w-1/2 overflow-y-scroll max-w-4xl mx-auto bg-gray-800 rounded max-h-full">
                {this.state.chats.map((msg, idx) => {
                    const userColor = getUserColor(msg.user); // Calculate color index based on user index

                    return (
                        <div key={idx} ref={idx === this.state.chats.length - 1 ? this.chatRef : null}>
                        <div className="flex mb-2">
                            <div className="rounded py-2 px-3" style={{ backgroundColor: userColor }}>
                            <p className="text-sm text-teal">User {msg.user}</p>
                            <p className="text-sm mt-1">{msg.text}</p>
                            <p className="text-right text-xs text-grey-dark mt-1">{msg.time}</p>
                            </div>
                        </div>
                        </div>
                    );
                    })}
                    <TextField 
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={2}
                        placeholder="Enter your message here"
                        value={this.state.cur_msg}
                        onChange={evt => this.setState({ cur_msg: evt.target.value })}
                        onKeyDown={this.handleKeyDown}
                        InputProps={{
                        style: { color: 'white' }
                        }}
                    />
                    </div>
            </div>
            );
        
    }
}

export default JoinVideoRoom;
