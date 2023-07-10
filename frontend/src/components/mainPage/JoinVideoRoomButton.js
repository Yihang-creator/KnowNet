import React from 'react';
import { Button } from "@mui/material"
import { Link } from "react-router-dom";
import YouTubeIcon from '@mui/icons-material/YouTube';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
    palette: {
      primary: {
        main: '#00bcd4',
      },
      secondary: {
        main: '#009688',
      },
    },
  });

  const JoinVideoRoomButton = () => {
    return (
        <div className="mt-4">
            <Link to={`/joinVideoRoom`} className="group">
                <ThemeProvider theme={theme}>
                    <Button 
                        variant="contained" 
                        color='primary' 
                        disableElevation 
                        className="relative overflow-hidden transition-opacity duration-300 w-32 h-12"
                    >
                        <YouTubeIcon 
                            className="absolute inset-0 m-auto opacity-100 group-hover:opacity-0 transition-opacity duration-300"
                        />
                        <span 
                            className="absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                            Join Video Room
                        </span>
                    </Button>
                </ThemeProvider>
            </Link>
        </div>
    );
}

export default JoinVideoRoomButton;