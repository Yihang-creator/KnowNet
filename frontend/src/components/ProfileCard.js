import React from "react";
import ProfileResource from "./ProfileResource";

const ProfileCard = (props) => {
  return (
    <div className="flex flex-col justify-items-center w-80 h-80 bg-slate-50 border-2 border-cyan-200 rounded-lg shadow-xl dark:bg-gray-800 dark:border-gray-700">
      <ProfileResource type={props.type} link={props.src} />

      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {props.title}
        </h5>

        <p className="font-normal text-gray-700 dark:text-gray-400">
          {props.previewText}
        </p>
      </div>
    </div>
  );
};
export default ProfileCard;
