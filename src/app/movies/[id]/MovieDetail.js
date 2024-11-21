/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect } from 'react';
import SeatSelectionModal from '@/app/componentes/SeatSelectionModal';
import Link from 'next/link';
import './MovieDetail.css';
import Footer from '@/app/componentes/Footer';
import Header from '@/app/componentes/Header';
import axios from 'axios';

function MovieDetail({ movieId }) {
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    selectedCinema: '',
    selectedDate: '',
    selectedTime: '',
    selectedSeats: [],
    movieTitle: '', // Añadido: Campo para el título de la película
  });

  // Opciones de cines
  const cinemaOptions = [
    { name: 'Showcase Haedo', schedules: ['10:30', '13:00', '15:30', '18:00', '20:30'] },
    { name: 'Showcase Norcenter', schedules: ['11:00', '13:30', '16:00', '18:30', '21:00'] },
  ];

  const openModal = () => {
    setFormData({ ...formData, movieTitle: movie.title }); // Agregamos el título de la película
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const apiKey = '098839c0ee7f3effbf72bdd6b66deca4';
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=es-ES`
        );
        const data = await response.json();
        setMovie(data);

        const trailerResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`
        );
        const trailerData = await trailerResponse.json();
        const trailer = trailerData.results.find((video) => video.type === 'Trailer');
        if (trailer) setTrailerKey(trailer.key);

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const handleCompleteReservation = async () => {
    try {
      // Aquí puedes enviar los datos de reserva al servidor
      await axios.post('/api/leads', formData);
      alert(`Reserva completada para la película: ${formData.movieTitle}`);
      closeModal();
    } catch (error) {
      console.error('Error al completar la reserva:', error);
    }
  };

  if (loading) return <p>Cargando detalles...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="movie-detail-container">
      <div className="header-movie">
        <Header />
      </div>
      <Link href="/" className="back-button">
        ← Volver a Home
      </Link>

      <div className="movie-detail">
        <h1 className="movie-title">{movie.title}</h1>
        <div className="movie-info">
          <div className="movie-duration">
            <div className="movie-genres">
              {movie.genres.map((genre) => (
                <span key={genre.id} className="genre-badge">
                  {genre.name}
                </span>
              ))}
              <p>
                <strong>{movie.runtime} minutos</strong>
              </p>
              <p>
                <strong>
                  <span className="stars">⭐</span> {movie.vote_average}
                </strong>
              </p>
            </div>
          </div>
        </div>

        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="movie-poster"
        />

        <div className="movie-synopsis">
          <h3>SINOPSIS</h3>
          <p>{movie.overview}</p>
        </div>

        {trailerKey && (
          <div className="movie-trailer">
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Movie Trailer"
              allowFullScreen
              className="trailer-iframe"
            />
          </div>
        )}

        {/* Botón para comprar el ticket */}
        <div className="flex justify-center items-center mt-8">
          <button
            className="ticket-button bg-yellow-500 text-black px-4 py-2 rounded transition-transform transform hover:scale-105 hover:bg-yellow-400 shadow-lg "
            onClick={openModal}
          >
            Comprar tu ticket
          </button>
        </div>

        {/* Modal de reserva */}
        {isModalOpen && (
          <SeatSelectionModal
            isOpen={isModalOpen}
            onClose={closeModal}
            formData={formData}
            setFormData={setFormData}
            cinemaOptions={cinemaOptions}
            onComplete={handleCompleteReservation}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default MovieDetail;
