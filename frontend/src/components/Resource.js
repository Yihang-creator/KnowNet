import React from "react";

const Resource = (props) => {
    if (props.link.substr(-3) === "jpg") {
        return (<img className="rounded-t-lg h-3/5" src={props.link} alt="Image Not Avaliable"/>)
    } else {
        return (
            <video controls className="rounded-t-lg">
              <source src={props.link} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
        )
    }
};
export default Resource;