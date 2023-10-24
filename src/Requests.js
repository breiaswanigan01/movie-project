const key = "aaecfba74be2beca83e14bc1e9f2e8f0";
// const token =
//   "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YzY0MmUxOTI4OTg2NjU1YmJiYTliYTkyNjBlMGRjNCIsInN1YiI6IjY1MzgyOGZlZjQ5NWVlMDBmZjY1ZTA4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.y_YCU87Hwa2nMe7KiPkcR8P0cQcsd9KYi5Vs9Sr8eeo";

const requests = {
  requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1'`,
  requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}?language=en-US&page=1`,
  requestUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}?language=en-US&page=1`,
  requestPopularTv: `https://api.themoviedb.org/3/tv/popular?api_key=${key}?language=en-US&page=1`,
  requestTopRatedTv: `https://api.themoviedb.org/3/tv/top_rated?api_key=${key}?language=en-US&page=1`,
  requestAiringTodayTv: `https://api.themoviedb.org/3/tv/airing_today?api_key=${key}?language=en-US&page=1`,
};

export default requests;
