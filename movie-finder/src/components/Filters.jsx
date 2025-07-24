import "./Filter.css";

function Filters({
  selectedGenre,
  setSelectedGenre,
  voteRange,
  setVoteRange,
  dateRange,
  setDateRange,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  resetFilters,
}) {
  return (
    <div className="filters-container">
        <h2>Filtros</h2>
      <label>Género:</label>
      <select
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
      >
        <option value="">Todos</option>
        <option value="Action">Action</option>
        <option value="Adventure">Adventure</option>
        <option value="Fantasy">Fantasy</option>
        <option value="Science Fiction">Science Fiction</option>
      </select>

      <label>Puntiación promedio:</label>
      <input
        type="number"
        min="0"
        max="10"
        step="0.1"
        value={voteRange[0]}
        onChange={(e) => setVoteRange([parseFloat(e.target.value), voteRange[1]])}
      />
      <input
        type="number"
        min="0"
        max="10"
        step="0.1"
        value={voteRange[1]}
        onChange={(e) => setVoteRange([voteRange[0], parseFloat(e.target.value)])}
      />

      <label>Fecha de lanzamiento:</label>
      <input
        type="date"
        value={dateRange[0]}
        onChange={(e) => setDateRange([e.target.value, dateRange[1]])}
      />
      <input
        type="date"
        value={dateRange[1]}
        onChange={(e) => setDateRange([dateRange[0], e.target.value])}
      />

      <label>Ordenar por:</label>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="vote_average">Vote Average</option>
        <option value="release_date">Release Date</option>
      </select>

      <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <option value="desc">Descendente</option>
        <option value="asc">Ascendente</option>
      </select>

      <button className="reset-btn" onClick={resetFilters}>
        Resetear Filtros
      </button>
    </div>
  );
}

export default Filters;
