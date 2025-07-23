const SearchBar = ({ query, setQuery }) => {
  return (
    <input
      type="text"
      placeholder="Buscar película..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="w-full p-2 border rounded"
    />
  );
};

export default SearchBar;
