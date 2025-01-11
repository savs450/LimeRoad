import React from "react";
import { img_300, img_500, unavailable, noPicture } from "./util";

function Cards({ id, poster, title, date, media_type, vote_average,onClick }) {
  return (
    // <div className='flex flex-col items-center gap-4 p-4 border rounded-lg ' >
    <div onClick={onClick}
    className="flex-shrink-0 w-full sm:w-[300px] lg:w-1/4 xl:w-1/5 bg-customBlue p-2.5 rounded-2xl">
      <div className="w-full h-auto rounded-lg">
        <img
          className="rounded-2xl"
          src={poster ? `${img_300}/${poster}` : unavailable}
          alt={title}
        ></img>
      </div>
      <div className="flex-shrink-0 w-full ">
        <div className="flex justify-center items-center text-white text-lg font-semibold text-ellipsis overflow-hidden whitespace-wrap">{title}</div>
        <div className="flex justify-between w-full text-sm text-white">
          <span>{media_type === "tv" ? "TV Series" : "Movies"}</span>
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
}

export default Cards;
