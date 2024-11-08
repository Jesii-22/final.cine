/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect } from 'react';
import SeatSelectionModal from './SeatSelectionModal';
import Link from 'next/link';
import './MovieDetail.css';
import Footer from '@/app/componentes/Footer';
import Header from '@/app/componentes/Header';

function MovieDetail({ params }) {
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

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

  const cinemaOptions = [
    { name: 'Showcase Haedo', schedules: ['10:30', '13:00', '15:30', '18:00', '20:30'] },
    { name: 'Showcase Norcenter', schedules: ['11:00', '13:30', '16:00', '18:30', '21:00'] }
  ];

  const handleCinemaSelect = (cinema) => {
    setSelectedCinema(cinema);
    setSelectedSchedule(null); 
  };

  const handleScheduleSelect = (schedule) => {
    setSelectedSchedule(schedule);
    openModal(); 
  };

  if (loading) return <p>Cargando detalles...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="movie-detail-container">
      <Link href="/" className="back-button">← Volver a Home</Link>

      <div className="movie-detail">
        <h1 className="movie-title">{movie.title}</h1>
        <div className="movie-info">
          <div className="movie-duration">
            <p><strong>{movie.runtime} minutos</strong></p>
            <p><strong><span className="stars">⭐</span> {movie.vote_average}</strong></p>
          </div>
        </div>

        <div className="movie-genres">
          {movie.genres.map((genre) => (
            <span key={genre.id} className="genre-badge">{genre.name}</span>
          ))}
        </div>

        {/* Cinema selection section */}
        <div className="cinema-selection">
          <h3>Selecciona tu cine:</h3>
          {cinemaOptions.map((cinema) => (
            <div key={cinema.name}>
              <button onClick={() => handleCinemaSelect(cinema)} className="cinema-button">
                {cinema.name}
              </button>
              {selectedCinema === cinema && (
                <div className="schedule-selection">
                  <p>Selecciona horario:</p>
                  {cinema.schedules.map((schedule) => (
                    <button key={schedule} onClick={() => handleScheduleSelect(schedule)} className="schedule-button">
                      {schedule}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
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

        {isModalOpen && <SeatSelectionModal isOpen={isModalOpen} onClose={closeModal} />}
      </div>
      <Footer />
    </div>
  );
}

export default MovieDetail;
