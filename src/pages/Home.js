import React from "react";
import Main from "../components/Main";
import Row from "../components/Row";
import requests from "../Requests";
const Home = () => {
  return (
    <>
      <Main />
      <Row rowID='1' title="Popular" fetchURL={requests.requestPopular} />
      <Row rowID='2' title="Top Rated" fetchURL={requests.requestTopRated} />
      <Row rowID='3' title="Trending Movies" fetchURL={requests.requestTrending} />
      <Row rowID='4' title="Fav Movies" fetchURL={requests.requestFavs} />
      <Row rowID='5' title="UpComing" fetchURL={requests.requestUpcoming} />
    </>
  );
};

export default Home;
