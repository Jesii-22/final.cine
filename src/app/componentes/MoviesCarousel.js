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
     <h2 className="text-2xl font-bold mb-4 px-4 text-gradient hover:bg-yellow-500 hover:text-black transition-all duration-300"> Películas Más Vistas</h2>
      <div className="relative overflow-x-hidden">
        <button
          className="absolute left-0 h-full z-10 px-2 bg-black bg-opacity-50"
          onClick={scrollLeft}
        >
          {"<"}
        </button>
        <div
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-4"
        >
          {movies.map((movie) => (
            <div key={movie.id} className="min-w-[200px] flex-shrink-0">
            <Link href={`/movies/${movie.id}`} className="group">
                <div
                  className="w-full aspect-video bg-cover bg-center rounded"
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
                  }}
                ></div>
                <p className="text-center mt-2 font-medium">{movie.title}</p>
              </Link>
            </div>
          ))}
        </div>
        <button
          className="absolute right-0 h-full z-10 px-2 bg-black bg-opacity-50"
          onClick={scrollRight}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}
