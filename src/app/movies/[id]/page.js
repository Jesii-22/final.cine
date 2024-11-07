/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect } from 'react';  
import SeatSelectionModal from './SeatSelectionModal';
import Link from 'next/link';
import './MovieDetail.css'

function MovieDetail({ params }) {
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { id } = params;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const apiKey = "098839c0ee7f3effbf72bdd6b66deca4";
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=es-ES`);
        const data = await response.json();
        setMovie(data);

        const trailerResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`);
        const trailerData = await trailerResponse.json();
        const trailer = trailerData.results.find(video => video.type === 'Trailer');
        if (trailer) setTrailerKey(trailer.key);

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <p>Cargando detalles...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="movie-detail-container">
      <Link href="/" className="back-button">← Volver a Home</Link>

      <div className="movie-detail">
        <h1 className="movie-title ">{movie.title}</h1>
        <div className="movie-info">
          <div className="movie-duration">
            <p><strong>Duración:</strong> {movie.runtime} minutos</p>
            <p><strong>Calificación:</strong> <span className="stars">⭐</span> {movie.vote_average}</p>
          </div>
        </div>

        <div className="movie-genres">
          {movie.genres.map((genre) => (
            <span key={genre.id} className="genre-badge">{genre.name}</span>
          ))}
        </div>

        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="movie-poster" />

        <div className="movie-synopsis">
          <h3>Sinopsis</h3>
          <p>{movie.overview}</p>
        </div>

        {trailerKey && (
          <div className="movie-trailer">
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Movie Trailer"
              allowFullScreen
              className="trailer-iframe" />
          </div>
        )}

        <button onClick={openModal} className="reserve-button">
          Reservar Ticket
        </button>

        {isModalOpen && <SeatSelectionModal isOpen={isModalOpen} onClose={closeModal} />}
      </div>
    </div>
  );
}

export default MovieDetail;
