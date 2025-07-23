const MovieCard = ({ movie }) => {
  return (
    <div className="border p-3 rounded shadow-sm hover:shadow-md transition">
      <h2 className="text-xl font-semibold mb-1">{movie.title}</h2>
      <p className="text-sm text-gray-600 mb-2">{movie.release_date}</p>
      <p className="text-sm">{movie.overview?.slice(0, 150)}...</p>
    </div>
  );
};

export default MovieCard;
