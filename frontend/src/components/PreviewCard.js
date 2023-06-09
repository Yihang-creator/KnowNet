import React from "react";
import Resource from "./Resource";

const PreviewCard = (props) => {
    return (
        <div class="w-80 h-80 m-5 bg-slate-50 border-2 border-cyan-200 rounded-lg shadow-xl dark:bg-gray-800 dark:border-gray-700">
            <a href=" ">
                <Resource link={props.src}/>
            </a >
            <div class="p-5">
                <a href="#">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {props.title}
                    </h5>
                </a >
                <p class="font-normal text-gray-700 dark:text-gray-400">
                    {props.previewText}
                </p >
            </div>
        </div>
    );
};
export default PreviewCard;