import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import "./App.css";

const API_KEY = "f709ffaed079893a8f0865c5a429d5c0";
const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US`;

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    searchMovies("Batman"); // default search on load
  }, []);

  const searchMovies = async (title) => {
    if (!title) return;
    try {
      const response = await fetch(`${API_URL}&query=${title}`);
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  return (
    <div className="app">
      <h1>Zaya Movies</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && searchMovies(searchTerm)}
          placeholder="Search for movies"
        />
        <img
          src="https://raw.githubusercontent.com/gist/adrianhajdin/997a8cdf94234e889fa47be89a4759f1/raw/f13e5a9a0d1e299696aa4a0fe3a0026fa2a387f7/search.svg"
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={{
                imdbID: movie.id,
                Title: movie.title,
                Year: movie.release_date?.split("-")[0],
                Poster: movie.poster_path,
                Type: movie.media_type || "movie",
              }}
            />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
