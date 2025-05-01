import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import MovieOverview from "./MovieOverview";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast"; // ✅ NEW

const Movie = ({ item }) => {
  const [like, setLike] = useState(false);
  const [displayOverview, setDisplayOverview] = useState(false);
  const { user } = UserAuth();

  const movieID = doc(db, "users", `${user?.email}`);

  const saveShow = async () => {
    if (user?.email) {
      setLike(!like);
      await updateDoc(movieID, {
        savedShows: arrayUnion({
          id: item.id,
          title: item.title,
          img: item.backdrop_path,
          overview: item.overview,
        }),
      });
      toast.success("Added to Watchlist!"); // ✅ Show toast
    } else {
      toast.error("Please log in to save movies."); // ✅ Show error toast
    }
  };

  const toggleOverview = () => {
    setDisplayOverview(!displayOverview);
  };

  return (
    <div
      key={item.id}
      className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2 shadow transition duration-700 ease-in-out"
      style={{ background: "rgba(0, 0, 0, 0.8)" }}
    >
      <Link to={`/movie/${item.id}`}>
        <img
          className="w-full h-auto block transition duration-700 ease-in-out"
          src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path || " "}`}
          alt={item?.title || item?.name}
        />
      </Link>

      <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 transition duration-700 ease-in-out">
        <Link to={`/movie/${item.id}`}>
          <p
            className="whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center absolute bottom-0 left-0 w-full p-2 text-white opacity-0 hover:opacity-100 transition duration-700 ease-in-out"
          >
            {item?.title}
          </p>
        </Link>
        <p onClick={saveShow}>
          {like ? (
            <FaHeart className="absolute top-4 left-4 text-blue-600" />
          ) : (
            <FaRegHeart className="absolute top-4 left-4 text-blue-600" />
          )}
        </p>
      </div>

      {displayOverview && (
        <MovieOverview item={item} closeOverview={toggleOverview} />
      )}
    </div>
  );
};

export default Movie;
