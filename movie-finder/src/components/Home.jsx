import { useEffect, useState, useMemo, useRef } from "react";
import Fuse from "fuse.js";
import SearchBar from './SearchBar';
import MovieCard from "./MovieCard";
import Filters from "./Filters";
import './Home.css'
import { FaGithub } from 'react-icons/fa';


function Home() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [voteRange, setVoteRange] = useState([0, 10]);
  const [dateRange, setDateRange] = useState(["1900-01-01", "2100-01-01"]);
  //estados para ordenamiento
  const [sortBy, setSortBy] = useState("vote_average");
  const [sortOrder, setSortOrder] = useState("desc");

  //reset de filtros
  const resetFilters = () => {
  setSelectedGenre("");
  setVoteRange([0, 10]);
  setDateRange(["1900-01-01", "2100-01-01"]);
  setSortBy("vote_average");
  setSortOrder("desc");
  };


  useEffect(() => {
    fetch("/movies.json")
      .then((res) => res.json())
      .then((data) =>
        setMovies(
          data.map((movie) => ({
            ...movie,
            genres: JSON.parse(movie.genres),
          }))
        )
      );
  }, []);

  const fuse = useMemo(() => {
    return new Fuse(movies, {
      keys: ["title", "overview", "genres"],
      threshold: 0.3,
    });
  }, [movies]);

  const results = useMemo(() => {
  let filtered = query
    ? fuse.search(query).map((result) => result.item)
    : [...movies];

  if (selectedGenre) {
    filtered = filtered.filter((movie) =>
      movie.genres.some((genre) => genre.name === selectedGenre)
    );
  }

  filtered = filtered.filter((movie) => {
    const vote = movie.vote_average;
    const date = new Date(movie.release_date);
    return (
      vote >= voteRange[0] &&
      vote <= voteRange[1] &&
      date >= new Date(dateRange[0]) &&
      date <= new Date(dateRange[1])
    );
  });

  return filtered.sort((a, b) => {
    const aVal = sortBy === "vote_average" ? a.vote_average : new Date(a.release_date);
    const bVal = sortBy === "vote_average" ? b.vote_average : new Date(b.release_date);
    return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
  });
}, [query, fuse, movies, selectedGenre, voteRange, dateRange, sortBy, sortOrder]);


  const [visibleMovies, setVisibleMovies] = useState(20);

  const loadMore = () => {
    setVisibleMovies((prev) => prev + 20);
  };

  const loaderRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, []);

  return (
    <div className="p-4">
      <button 
      onClick={() => window.open('https://github.com/JoaquinGabriel17/Movie-Finder', '_blank')}
      className="github-button"><FaGithub size={50}/></button>
      <SearchBar query={query} setQuery={setQuery} />
      <div className="filters-separator">
      <Filters
  selectedGenre={selectedGenre}
  setSelectedGenre={setSelectedGenre}
  voteRange={voteRange}
  setVoteRange={setVoteRange}
  dateRange={dateRange}
  setDateRange={setDateRange}
  sortBy={sortBy}
  setSortBy={setSortBy}
  sortOrder={sortOrder}
  setSortOrder={setSortOrder}
  resetFilters={resetFilters}
/>

      <div className="movies-separator">
      <div className="movies-container">
        {results.slice(0, visibleMovies).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <div
        ref={loaderRef}
        style={{ height: "40px", textAlign: "center", margin: "20px" }}
      >
        <span>Cargando más...</span>
      </div>
      </div>
      </div>
    </div>
  );
}

export default Home;
