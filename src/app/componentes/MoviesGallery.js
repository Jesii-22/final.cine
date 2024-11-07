"use client";
import Link from "next/link";

export default function MoviesGallery({ movies }) {
  return (
    <div className="px-4 py-5">
      <h2 className="text-3xl font-bold mb-4 px-4 text-gradient hover:bg-yellow-500 hover:text-black transition-all duration-300">
        Cartelera de Cine     

      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {movies.map((movie) => (
          <Link href={`/movies/${movie.id}`} key={movie.id}>
            <div className="relative group cursor-pointer">
              <div
                className="w-full aspect-video bg-cover bg-center rounded shadow-lg transition-transform duration-300 transform group-hover:scale-105 group-hover:border-2 group-hover:border-yellow-400"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
                }}
              ></div>
              <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center rounded">
                <p className="text-white text-lg font-semibold">{movie.title}</p>
                <div className="flex mt-2">
                  {Array(Math.round(movie.vote_average / 2))
                    .fill()
                    .map((_, i) => (
                      <span key={i} className="text-yellow-500 text-xl">
                        &#9733;
                      </span>
                    ))}
                  {Array(5 - Math.round(movie.vote_average / 2))
                    .fill()
                    .map((_, i) => (
                      <span key={i} className="text-gray-400 text-xl">
                        &#9733;
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
