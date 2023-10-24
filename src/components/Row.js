import axios from "axios";
import React, { useEffect, useState } from "react";

const Row = ({ title, fetchURL }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(fetchURL).then((response) => {
      setMovies(response.data.results);
    });
  },[fetchURL])
  console.log(movies)


  return (
 <>
      <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
      <div className="relative flex item-center">
        <div id={'slider'}>
            {movies.map((item, id) => (
                <div className='w-[160px] sm:w-[200] md:w-[240px] lg:w[280px] inlind-block cursor-pointer relative p-2'>
<img className='w-full h-auto block' src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`} alt={item?.title} />
<div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 hover:opacity-100 opacity-0 text-white'></div>
<p>{item?.title}</p>
     </div>
    ))}
    </div>
      </div>
    </>
  );
 };

export default Row
