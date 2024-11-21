import { useRef } from "react";
import Link from "next/link";

export default function MoviesCarousel({ movies }) {
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  return (
    <div className="relative w-full py-5">
      <h2 className="text-2xl font-bold mb-4 px-4 text-gradient hover:bg-yellow-500 hover:text-black transition-all duration-300">
        Películas Más Vistas
      </h2>
      <div className="relative overflow-hidden">
       
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 h-8 w-8 z-10 px-2 bg-black bg-opacity-50 rounded-full"
          onClick={scrollLeft}
        >
          {"<"}
        </button>
        <div
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto px-4"
          style={{
            WebkitOverflowScrolling: "touch",
            overflowX: "scroll",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="min-w-[220px] flex-shrink-0 group relative"
            >
              <Link href={`/movies/${movie.id}`}>
            
                <div className="p-2 rounded-lg group-hover:ring-4 group-hover:ring-yellow-500 transition-all transform group-hover:scale-105">
           
                  <div
                    className="w-full h-[400px] bg-cover bg-center rounded-lg"
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
                    }}
                  ></div>
                </div>
              
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                  <p className="text-white font-bold text-xl text-center px-4 group-hover:text-yellow-500">
                    {movie.title}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
       
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 h-8 w-8 z-10 px-2 bg-black bg-opacity-50 rounded-full"
          onClick={scrollRight}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}
