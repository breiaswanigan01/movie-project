import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactPlayer from "react-player"; // ✅ Added for trailer

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null); // ✅ Store trailer video

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieRes = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
        );
        setMovie(movieRes.data);

        const videoRes = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_TMDB_KEY}`
        );
        const trailerVid = videoRes.data.results.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        setTrailer(trailerVid?.key);
      } catch (err) {
        console.error("Movie fetch failed", err);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="text-white bg-black min-h-screen p-4 md:p-12">
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-600 px-4 py-2 mb-4 rounded hover:bg-blue-500"
      >
        ← Back
      </button>

      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-[300px] rounded"
        />
        <div>
          <h1 className="text-3xl md:text-5xl font-bold">{movie.title}</h1>
          <p className="text-gray-400 my-2">
            Released: {movie.release_date} | Rating: {movie.vote_average}
          </p>
          <p className="mt-4 leading-relaxed max-w-3xl">{movie.overview}</p>

          {/* ✅ Embedded YouTube Trailer */}
          {trailer && (
            <div className="mt-6">
              <h2 className="text-2xl font-semibold mb-2">Watch Trailer</h2>
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${trailer}`}
                controls
                width="100%"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
