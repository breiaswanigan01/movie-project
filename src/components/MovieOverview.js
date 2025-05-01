import React from "react";
import "../components/MovieOverview.css";
const MovieOverview = ({ item, closeOverview }) => {
  return (
    <div className="movie-overlay transition-all duration-[3500ms] ease-in-out">
    <div className="movie-content transition-all duration-[3500ms] ease-in-out">
   
        <p className="text-md md:text-lg text-center whitespace-normal leading-normal">
          {item?.overview}
        </p>
        <button
          className="text-blue-600 text-lg hover:text-blue-400 cursor-pointer pt-5 ttransition duration-700 ease-in-out   animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
          onClick={closeOverview}
        >
          Close
        </button>
      </div>
    </div>
  );
};
export default MovieOverview;
