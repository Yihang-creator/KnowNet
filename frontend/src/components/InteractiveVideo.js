import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { Button } from '@mui/material';

export default function InteractiveVideo() {
  const [videoData, setVideoData] = useState(null);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    // Fetch the first video on initial render
    fetchVideoData("1");
  }, []);

  const fetchVideoData = async (id) => {
    const response = await fetch(`/api/interactiveVideo/videoTree/${id}`);
    const data = await response.json();
    setVideoData(data);
  };

  const handleEnded = () => {
    setShowOptions(true);
  };

  const handleOptionClick = (nextVideoId) => {
    fetchVideoData(nextVideoId);
    setShowOptions(false);
  };

  if (!videoData) return 'Loading...';

  return (
    <div>
      <ReactPlayer url={videoData.url} onEnded={handleEnded}
      config={{
        youtube: {
          playerVars: {
            autoplay: 1,
            controls: 0,
            showinfo: 0,
            rel: 0,
            disablekb: 1,
            modestbranding: 1
          }
        }
      }}/>
      {showOptions && videoData.options.map(option => (
        <Button key={option.nextVideoId} onClick={() => handleOptionClick(option.nextVideoId)}>
          {option.label}
        </Button>
      ))}
    </div>
  );
}
