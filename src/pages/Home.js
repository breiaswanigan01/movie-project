import React, { useState, useEffect } from "react";
import Main from "../components/Main";
import Row from "../components/Row";
import requests from "../Requests";
import axios from "axios"; // ✅ Added for search
import Movie from "../components/Movie"; // ✅ Added for search

const Home = () => {
  const [searchTerm, setSearchTerm] = useState(""); // ✅ Search input
  const [searchResults, setSearchResults] = useState([]); // ✅ Store search results

  // ✅ Fetch search results when search term changes
  useEffect(() => {
    if (searchTerm.length < 2) return;

    const fetchSearch = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&query=${searchTerm}`
      );
      setSearchResults(res.data.results);
    };

    fetchSearch();
  }, [searchTerm]);

  return (
    <div className="pt-[90px] bg-black min-h-screen text-white">
      {/* ✅ Search input */}
      <div className="p-4">
        <input
          type="text"
          placeholder="Search movies..."
          className="w-full p-2 rounded text-black"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* ✅ If there's a search term, show results */}
      {searchTerm.length > 1 ? (
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Search Results:</h2>
          <div className="flex overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide">
            {searchResults.length > 0 ? (
              searchResults.map((movie) => <Movie key={movie.id} item={movie} />)
            ) : (
              <p>No results found.</p>
            )}
          </div>
        </div>
      ) : (
        <>
          <Main />
          <Row rowID="1" title="Popular Movies" fetchURL={requests.requestPopular} />
          <Row rowID="2" title="Top Rated Movies" fetchURL={requests.requestTopRated} />
          <Row rowID="3" title="Trending Movies" fetchURL={requests.requestTrending} />
          <Row rowID="4" title="Fav Movies" fetchURL={requests.requestFavs} />
          <Row rowID="5" title="Upcoming Movies" fetchURL={requests.requestUpcoming} />
        </>
      )}
    </div>
  );
};

export default Home;
