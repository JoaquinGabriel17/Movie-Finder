import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './MovieDetail.css'

export default function MovieDetail() {
  const { id } = useParams(); // ID de la URL
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    fetch('/movies.json')
      .then((res) => res.json())
      .then((data) => {
        const parsed = data.map((movie) => ({
          ...movie
        }));

        const foundMovie = parsed.find((m) => String(m.id) === id);
        if (foundMovie && typeof foundMovie.genres === 'string') {
          foundMovie.genres = JSON.parse(foundMovie.genres);
        }
        setMovie(foundMovie);

      });
  }, [id]);

  if (!movie) return <div>Cargando película...</div>;

  return (
    <div className="container">
        <button className='home-button' onClick={() => navigate('/')}>Home</button>
      <h1>{movie.title}</h1>
      <article>
      <p><strong>Fecha de estreno:</strong> {movie.release_date}</p>
      <p><strong>Voto promedio:</strong> {movie.vote_average}</p>
      <p>
        <strong>Géneros:</strong>
            <ul>
            {movie.genres.map((genre, id) => (
                <li key={id}>{genre.name}</li>
                ))}
                </ul>
            
        </p>
      </article>
      <div className='description-container'>
        <h2><strong>Descripción</strong></h2>
        <p> {movie.overview}</p>
      </div>
      
    </div>
  );
}
