import { useState, useEffect } from "react";

const useMovies = (endpoint = "now_playing") => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMovies = async () => {
    const apiKey = "098839c0ee7f3effbf72bdd6b66deca4";
    const url = `https://api.themoviedb.org/3/movie/${endpoint}?api_key=${apiKey}&language=es-ES`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true; // Flag para comprobar si el componente está montado
    if (isMounted) {
      fetchMovies();
    }

    return () => {
      isMounted = false; // Al desmontar, evitamos actualizar el estado
    };
  }, [endpoint]);

  return { movies, loading, error };
};

export default useMovies;
