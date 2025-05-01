import React, { useEffect, useState, useMemo } from "react"; // 🔄 Line 1: added useMemo
import requests from "../Requests";
import axios from "axios";

const Main = () => {
  const [movies, setMovies] = useState([]);                 // 🔄 Line 6
  const [loading, setLoading] = useState(true);             // 🔄 Line 7: added loading state

  // 🔄 Line 9-11: useEffect to fetch popular movies from API
  useEffect(() => {
    axios.get(requests.requestPopular).then((response) => {
      setMovies(response.data.results);
      setLoading(false); // 🔄 Line 12: stop loading once movies are fetched
    });
  }, []);

  // 🔄 Line 15: useMemo ensures random movie only changes when `movies` updates
  const movie = useMemo(() => {
    return movies[Math.floor(Math.random() * movies.length)];
  }, [movies]);

  // 🔄 Line 20: utility function to truncate movie overview
  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  // 🔄 Line 26: Show loading skeleton while data is being fetched
  if (loading) {
    return (
      <div className="w-full h-[550px] bg-gray-800 animate-pulse">
        <div className="w-full h-full flex flex-col justify-center items-center text-gray-400">
          <div className="h-8 w-1/2 bg-gray-700 rounded mb-4" />
          <div className="h-6 w-1/4 bg-gray-700 rounded mb-2" />
          <div className="h-4 w-2/3 bg-gray-700 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[550px] text-white">
      <div className="w-full h-full">
        <div className="absolute w-full h-[550px] bg-gradient-to-r from-black"></div>

        {/* 🔄 Line 40: movie backdrop image */}
        <img
          className="w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie?.title}
        />

        {/* 🔄 Line 46: content container */}
        <div className="absolute w-full top-[20%] p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl font-bold">{movie?.title}</h1>

          {/* 🔄 Line 49: Buttons */}
          <div className="my-4">
            <button className="border bg-gray-300 text-black border-gray-300 py-2 px-5">
              Play
            </button>
            <button className="border text-white border-gray-300 py-2 px-5 ml-4">
              Watch Later
            </button>
          </div>

          {/* 🔄 Line 56: movie release date */}
          <p className="text-gray-400 text-sm">
            Released: {movie?.release_date}
          </p>

          {/* 🔄 Line 60: movie overview (truncated) */}
          <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">
            {truncateString(movie?.overview, 150)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
