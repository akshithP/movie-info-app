import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

const API_URL = `http://www.omdbapi.com?apikey=${process.env.REACT_APP_API_KEY}`;

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [movies, setMovies] = useState([]);

  // fetch movies depending on search term
  const findMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    console.log(data)

    setMovies(data.Search);
  };

  // Only run at start
  useEffect(() => {
    findMovies("Spiderman");
  }, []);

  return (
    <div className="app">
      <h1>MovieInfo</h1>
      <div className="search">
        <input
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => findMovies(searchTerm)}
        />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found :( </h2>
        </div>
      )}
    </div>
  );
};

export default App;
