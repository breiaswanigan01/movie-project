import React from "react";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import MovieOverview from "./MovieOverview";

const Movie = ({ item }) => {
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const [displayOverview, setDisplayOverview] = useState(false);
  const { user } = UserAuth();

  // referencing database of users, and grabbing specific email
  const movieID = doc(db, "users", `${user?.email}`);

  // saved show function
  const saveShow = async () => {
    if (user?.email) {
      setLike(!like);
      setSaved(true);
      await updateDoc(movieID, {
        savedShows: arrayUnion({
          id: item.id,
          title: item.title,
          img: item.backdrop_path,
          overview: item.overview,
        }),
      });
    } else {
      alert("Please log in to save a movie");
    }
  };
  // toggle movie overview on click
  const toggleOverview = () => {
    setDisplayOverview(!displayOverview);
  };

  return (
    <div
      onClick={toggleOverview}
      key={item.id}
      className="w-[160px] sm:w-[200] md:w-[240px] lg:w[280px] inline-block cursor-pointer relative p-2 shadow hover:shadow-white/100"
      style={{ background: "rgba(0, 0, 0, 0.8)" }}
    >
      <img
        className="w-full h-auto block "
        src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path || " "}`}
        alt={item?.title || item?.name}
      />
      <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100">
        <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center absolute bottom-0 left-0 w-full p-2 text-white opacity-0 hover:opacity-100 transition-opacity">
          {item?.title}
        </p>
        <p onClick={saveShow}>
          {like ? (
            <FaHeart className="absolute top-4 left-4 text-blue-600" />
          ) : (
            <FaRegHeart className="absolute top-4 left-4 text-blue-600" />
          )}
        </p>
      </div>
      {displayOverview && <MovieOverview item={item} closeOverview={toggleOverview} />}
        </div>


  );
};

export default Movie;
