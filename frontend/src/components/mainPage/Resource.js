import React from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ReactPlayer from "react-player";

const Resource = (props) => {
    if (props.type === "image") {
        return (<LazyLoadImage
            className="rounded-t-lg h-3/5 w-full border-b-4 border-orange-200" src={props.link} alt="Image Not Avaliable"
            />)
    } else {
        return (
            <div className="rounded-t-lg h-3/5 border-b-4 border-orange-200 w-full">
                <ReactPlayer
                    url={props.link}
                    width="100%"
                    height="100%"
                    style={{ borderRadius: '4px' }}
                    config={{
                        // https://developers.google.com/youtube/player_parameters?playerVersion=HTML5
                        youtube: {
                          playerVars: {
                            controls: 0,
                            modestbranding: 1,
                          }
                        }
                    }}
                />
            </div>
        )
    }
};
export default Resource;