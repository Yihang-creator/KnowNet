import React from "react";
import Resource from "./Resource";
import "./PreviewCard.css";

const PreviewCard = (props) => {
  return (
    <div className="flex w-full flex-col justify-items-center rounded-lg border-2 border-cyan-200 bg-slate-50 shadow-xl dark:border-gray-700 dark:bg-gray-800">
      <div className="flex-container">
        <img className="css-shadow" src={props.userPhotoUrl} alt="Image Not Avaliable" />
        <h5>By: {props.username}</h5>
      </div>
      <span >
        <Resource type={props.type} link={props.src} className=" w-full" />
      </span>
      <div className="p-5">
        <span>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white overflow-scroll">
            {props.title}
          </h5>
        </span>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {props.previewText}
        </p>
      </div>
    </div>
  );
};
export default PreviewCard;
