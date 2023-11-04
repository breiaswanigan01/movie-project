import React from "react";

const MovieOverview = ({ item, closeOverview }) => {
  return (
    <div className=" top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-xl">
      <div className="bg-black/80 text-white p-4 backdrop-blur-md rounded-md">
        <p className="text-md text-center">{item?.overview}</p>
        <button
          className="text-blue-600 hover:text-blue-400 cursor-pointer"
          onClick={closeOverview}
        >
          Close
        </button>
   
    </div>
    </div>
  );
};
export default MovieOverview;
