import React from "react";

const ProfileResource = (props) => {
  if (props.type === "image") {
    return (
      <img className="h-80 w-full" src={props.link} alt="Image Not Avaliable" />
    );
  } else {
    return (
      <video controls className="object-fill">
        <source src={props.link} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }
};
export default ProfileResource;
