import React from "react";
import Resource from "./Resource";

const PreviewCard = (props) => {
  return (
    <div className="flex w-full flex-col justify-items-center rounded-lg border-2 border-cyan-200 bg-slate-50 shadow-xl dark:border-gray-700 dark:bg-gray-800">
      <a href=" ">
        <Resource type={props.type} link={props.src} className=" w-full" />
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
