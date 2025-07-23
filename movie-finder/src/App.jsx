import { useEffect, useState, useMemo, useRef  } from "react";
import Fuse from "fuse.js";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");



  // Cargar JSON local
  useEffect(() => {
    fetch("/movies.json")
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }, []);

  // Fuse.js setup
  const fuse = useMemo(() => {
    return new Fuse(movies, {
      keys: ["title", "overview", "genres"],
      threshold: 0.3,
    });
  }, [movies]);

 const results = useMemo(() => {
  if (query) {
    return fuse
      .search(query)
      .map((result) => result.item)
      .sort((a, b) => b.vote_average - a.vote_average);
  } else {
    return [...movies].sort((a, b) => b.vote_average - a.vote_average);
  }
}, [query, fuse, movies]);

useEffect(() => {
  setVisibleMovies(20);
}, [query]);


  //                                                     Lógica de paginación
  /*const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const paginatedResults = results.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
  );*/

                                                  //Logica para scroll infinito
  const [visibleMovies, setVisibleMovies] = useState(20); // empieza mostrando 20

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
      
        <SearchBar query={query} setQuery={setQuery} />
       
      <div className="movies-container">

        {results.slice(0, visibleMovies).map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
        ))}

      </div>
  
<div ref={loaderRef} style={{ height: "40px", textAlign: "center", margin: "20px" }}>
  <span>Cargando más...</span>
</div>


  {/*HTML del paginado
  Array.from({ length: Math.ceil(results.length / itemsPerPage) }).map((_, index) => (
    <button
      key={index}
      onClick={() => setCurrentPage(index + 1)}
      style={{
        margin: "5px",
        backgroundColor: currentPage === index + 1 ? "gray" : "white",
      }}
    >
      {index + 1}
    </button>
  ))*/}

    </div>
  );
}

export default App;
