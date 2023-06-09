import React from "react";
import Resource from "./Resource";

const PreviewCard = (props) => {
  return (
    <div className="w-80 h-80 m-5 bg-slate-50 border-2 border-cyan-200 rounded-lg shadow-xl dark:bg-gray-800 dark:border-gray-700">
      <a href=" ">
        <Resource type={props.type} link={props.src} />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {props.title}
          </h5>
        </a>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {props.previewText}
        </p>
      </div>
    </div>
  );
};
export default PreviewCard;
