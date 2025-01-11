import React from "react";
import { img_300 } from "./util";

function DetailModal({ details, onClose }) {
  console.log("modal", details);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white font-bold bg-gray-800 p-2 rounded-full hover:bg-gray-600"
        >
          X
        </button>
        <div className="flex flex-col lg:flex-row gap-6">
          <img
            className="rounded-xl w-full lg:w-1/3 object-cover"
            src={`${img_300}/${details.poster_path}`}
            alt={details.title}
          />
          <div className="flex flex-col justify-between space-y-4 w-full lg:w-2/3">
            <h3 className="text-2xl font-semibold text-gray-800">{details.title}</h3>
            <p className="text-gray-600"><strong>Overview</strong><br />{details.overview}</p>
            <div className="space-y-2 text-gray-700">
              <p><strong>Original Language:</strong> {details.original_language}</p>
              <p><strong>Popularity:</strong> {details.popularity}</p>
              <p><strong>Vote Average:</strong> {details.vote_average}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailModal;
