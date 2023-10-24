import React, { useEffect, useState } from "react";
import requests from "../Requests";
import axios from "axios";
const Main = () => {
  // use state to get the updated movies displayed
  const [movies, setMovies] = useState([]);
  //   selecting a random movie each refresh
  const movie = movies[Math.floor(Math.random() * movies.length)];

  //   getting the popular movies & showing the results in the console
  useEffect(() => {
    axios.get(requests.requestPopular).then((response) => {
      setMovies(response.data.results);
    });
  }, []);
  //   console.log(movie);
//   a function to alter the amount of words displayed in the overview
  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };
  return (
    <div className="w-full h-[550px] text-white">
      <div className="w-full h-full">
        <div className="absolute w-full h-[550px] bg-gradient-to-r from-black"></div>
        <img
          className="w-full h-full object-cover"
          //   displaying movie img
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie?.title}
        />
        <div className="absolute w-full top-[20%] p-4 md:p-8">
          {/* displaying movie title */}
          <h1 className="text-3xl md:text-5xl font-bold">{movie?.title}</h1>
          <div className="my-4">
            {/* creating btns */}
            <button className="border bg-gray-300 text-black border-gray-300 py-2 px-5">
              Play
            </button>
            <button className="border  text-white border-gray-300 py-2 px-5 ml-4">
              Watch Later
            </button>
          </div>
          {/* displaying movie release date */}
          <p className="text-gray-400 text-sm">
            Released: {movie?.release_date}
          </p>
          {/* displaying overview of movie (info about) */}
          <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">
            {/* only display 150 words */}
            {truncateString(movie?.overview, 150)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
