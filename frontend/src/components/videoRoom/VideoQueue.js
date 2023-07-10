import { Container, List, ListItem, Typography } from '@mui/material';
import React from 'react';

class VideoQueue extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        queue: [],
        current: 0,
        changeVideo: props.changeVideo,
        is_join: props.is_join || false,
        backend: props.backend,
      };
    }

    componentDidMount() {
        this.state.backend.socket.on('update-queue', (queue) => {
            this.setState({ queue: queue });
        });
    }
  
    makeList = () => {
        return this.state.queue.map((vid, idx) => {
            let itemVariant = 'light';
            if (this.state.current === idx) {
                itemVariant = 'info';
            }

            return (
                <ListItem
                    key={idx}
                    button
                    variant={itemVariant}
                    onClick={() => {
                        if (!this.state.is_join) {
                            this.setState({ current: idx });
                            this.state.changeVideo(vid);
                        }
                    }}
                >
                    {vid.toString().substring(0, 50)}
                </ListItem>
            );
        });
    }
  
    render() {
      return (
        <Container>
          <Typography variant="h5" className="mb-3 items-center justify-center">Video List</Typography>
          <List>{this.makeList()}</List>
        </Container>
      );
    }
  }
  
  export default VideoQueue;