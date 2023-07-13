import React from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Resource = (props) => {
    if (props.type === "image") {
        return (<LazyLoadImage
            className="rounded-t-lg h-3/5 w-full border-b-4 border-orange-200" src={props.link} alt="Image Not Avaliable"
            />)
    } else {
        return (
            <video controls className="rounded-t-lg h-3/5 border-b-4 border-orange-200 w-full">
              <source src={props.link} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
        )
    }
};
export default Resource;