import Link from "next/link";
export default function MainContent({ movies }) {
    return (
      <div className="py-5 px-4">
        <h2 className="text-2xl font-bold mb-4">Películas en Cartelera</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {movies.map((movie) => (
            movie.poster_path ? (  
              <div key={movie.id} className="relative w-full aspect-video bg-cover bg-center rounded"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
                }}>
                <p className="text-center mt-2 font-medium">{movie.title}</p>
              </div>
            ) : (
              <div key={movie.id} className="relative w-full aspect-video bg-gray-500 rounded">
                <p className="text-center mt-2 font-medium">No disponible</p>
              </div>
            )
          ))}
        </div>
      </div>
    );
  }
  