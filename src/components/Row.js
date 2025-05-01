import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Movie from "./Movie";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Row = ({ title, fetchURL, rowID }) => {
  const [movies, setMovies] = useState([]);
  const sliderRef = useRef(); // ✅ Ref for drag support

  // 🔁 Fetch movies
  useEffect(() => {
    axios.get(fetchURL).then((response) => {
      setMovies(response.data.results);
    });
  }, [fetchURL]);

  // ✅ Scroll functions
  const slideLeft = () => {
    sliderRef.current.scrollLeft -= 500;
  };
  const slideRight = () => {
    sliderRef.current.scrollLeft += 500;
  };

  // ✅ Drag functionality
  let isDragging = false;
  let startX;
  let scrollLeft;

  const startDrag = (e) => {
    isDragging = true;
    startX = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft = sliderRef.current.scrollLeft;
  };

  const stopDrag = () => {
    isDragging = false;
  };

  const dragScroll = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2; // scroll speed
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <>
      <h2 className="text-white font-bold md:text-2xl p-4">{title}</h2>
      <div className="relative flex items-center group">
        {/* Left arrow */}
        <MdChevronLeft
          onClick={slideLeft}
          className="bg-blue-600/75 text-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />

        {/* Scroll container */}
        <div
          ref={sliderRef}
          id={"slider" + rowID}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
          onMouseDown={startDrag}
          onMouseLeave={stopDrag}
          onMouseUp={stopDrag}
          onMouseMove={dragScroll}
        >
          {movies.map((item, id) => (
            <Movie key={id} item={item} />
          ))}
        </div>

        {/* Right arrow */}
        <MdChevronRight
          onClick={slideRight}
          className="bg-blue-600/75 right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
      </div>
    </>
  );
};

export default Row;
