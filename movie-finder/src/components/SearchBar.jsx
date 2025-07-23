import './SearchBar.css'

const SearchBar = ({ query, setQuery }) => {
  return (
    <div className="searchbar-background" >
            <div className="searchbar-container">
            <h1 className="text-3xl font-bold mb-4">Todas las películas, una sola búsqueda.</h1>
    <input
      type="text"
      placeholder="Buscar película..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="main-input"
    />
     </div>
      </div>
  );
};

export default SearchBar;
