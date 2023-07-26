import React, { useState, useEffect, useCallback, useRef } from 'react';
import ReactPlayer from 'react-player';
import { Button, Box } from '@mui/material';
import Layout from '../mainPage/Layout';
import { useOktaAuth } from '@okta/okta-react';

export default function InteractiveVideo() {
  const [videoData, setVideoData] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [duration, setDuration] = useState(0);
  const { oktaAuth } = useOktaAuth();
  const [muted, setMuted] = useState(true);
  const playerRef = useRef(null);

  const fetchVideoData = useCallback(async (id) => {
    const response = await fetch(`/api/interactiveVideo/videoTree/${id}`, {
      headers: {'Authorization': 'Bearer ' + oktaAuth.getAccessToken()}
    });
    const data = await response.json();
    setVideoData(data);
    setShowOptions(false);
  }, [oktaAuth]);

  useEffect(() => {
    // Fetch the first video on initial render
    fetchVideoData("73c02961-526f-4011-988d-640dadac4fd9");
  }, [fetchVideoData]);

  const handleProgress = ({ playedSeconds }) => {
    // If there's less than 10 seconds left in the video, show the options
    if (duration - playedSeconds <= videoData.remain) {
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
    <Layout>
      <Box className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
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
              }
            }
          }}
        />
        {showOptions && (
          <Box flex={1} flexDirection='row'>
            {videoData.options.map(option => (
              <Button 
                key={option.nextVideoId} 
                variant="contained" 
                onClick={() => handleOptionClick(option.nextVideoId)}>
                {option.label}
              </Button>
            ))}
          </Box>
        )}
      </Box>
    </Layout>
  );
}
