import React from "react";
import ReactPlayer from "react-player";

const ProfileResource = (props) => {
  if (props.type === "image") {
    return (
      <img className="h-3/5 w-full" src={props.link} alt="Image Not Avaliable" />
    );
  } else {
    return (
      <div className="w-full h-3/5">
        <ReactPlayer 
          url={props.link} 
          width="100%"
          height="100%"
        />
      </div>
    );
  }
};
export default ProfileResource;
