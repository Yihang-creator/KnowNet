import React from "react";

const ProfileResource = (props) => {
  if (props.type === "image") {
    return (
      <img
        className="rounded-t-lg h-3/5 w-full border-b-4 border-orange-200"
        src={props.link}
        alt="Image Not Avaliable"
      />
    );
  } else {
    return (
      <video
        controls
        className="rounded-t-lg h-3/5 border-b-4 border-orange-200"
      >
        <source src={props.link} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }
};
export default ProfileResource;
