import React from "react";
import { img_300, unavailable } from "./util";
import { FaRegHeart, FaHeart } from "react-icons/fa";

function Cards({
  id,
  poster,
  title,
  date,
  media_type,
  isFavourite,
  toggleFavourite,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className="flex-shrink-0 w-full sm:w-[300px] lg:w-1/4 xl:w-1/5 bg-customBlue p-2.5 rounded-2xl relative"
    >
      <div className="w-full h-auto rounded-lg">
        <img
          className="w-full h-auto rounded-2xl object-cover"
          src={poster ? `${img_300}/${poster}` : unavailable}
          alt={title}
        ></img>
      </div>
      <button
        className="absolute top-2 right-2 p-2 rounded-full transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          toggleFavourite();
        }}
      >
        {isFavourite ? (
          <FaHeart className="w-8 h-8 text-red-600" />
        ) : (
          <FaRegHeart className="w-8 h-8 text-gray-600" />
        )}
      </button>
      <div className="flex-shrink-0 w-full ">
        <div className="flex justify-center items-center text-white text-lg font-semibold text-ellipsis overflow-hidden whitespace-wrap">
          {title}
        </div>
        <div className="flex justify-between w-full text-sm text-white">
          <span>{media_type === "tv" ? "TV Series" : "Movies"}</span>
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
}

export default Cards;
