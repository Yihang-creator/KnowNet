import React from 'react';
import ReactPlayer from 'react-player';
import VideoQueue from './VideoQueue';
import { Button, TextField, Grid } from '@mui/material';

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
        };

        this.ref = React.createRef();
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

        // this.state.backend.socket.on('chat-added', (message) => {
        //     this.state.chats.push(message);
        // });
        
    }

    componentDidUpdate(prevProps, prevState) {
        if ((Math.abs(this.state.duration - prevState.duration)) > 2) {
            this.ref.current.seekTo(this.state.duration, 'seconds');
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

        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-5 text-white">
              <div className="container max-w-4xl mx-auto pt-6 px-3 bg-gray-800 rounded shadow-xl">
                <div className="text-2xl font-bold mb-4">Room ID: {this.state.backend.state.roomId}</div>
                <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-md shadow-lg mb-4">
                  <ReactPlayer
                    className="react-player w-full h-full object-cover m-4"
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
                  />
                </div>
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
          );
        
    }
}

export default JoinVideoRoom;
