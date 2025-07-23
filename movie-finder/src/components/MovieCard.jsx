import './MovieCard.css';

const MovieCard = ({ movie }) => {
  return (
    <div className="card-contain">
      <h2 className="card-title">{movie.title}</h2>
      <h3 className="card-vote">{movie.vote_average}</h3>
      <p className="card-date">{movie.release_date}</p>
      <p className="card-overview">{movie.overview?.slice(0, 150)}...</p>
    </div>
  );
};

export default MovieCard;
