"use client";
import Link from "next/link";

export default function MainFeaturedMovie({ movie }) {
  return (
    <div
      className="relative w-full h-[500px] bg-cover bg-center text-white flex flex-col justify-center items-start p-8 overflow-hidden transition-transform duration-700 transform hover:scale-105"
      style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})` }}
    >
      <div className="bg-black bg-opacity-50 p-4 rounded-md max-w-[50%]">
        <h1 className="text-5xl font-extrabold text-yellow-500">
          {movie.title}
        </h1>
        <p className="text-lg mt-2 animate-fade-in-up delay-200">{movie.overview}</p>
        <div className="flex gap-4 mt-4">
          <button className="bg-yellow-500 text-black px-4 py-2 rounded transition-transform transform hover:scale-105 hover:bg-yellow-400 shadow-lg">
            Ver Trailer
          </button>
          <button className="bg-gray-700 px-4 py-2 rounded transition-transform transform hover:scale-105 hover:bg-gray-600 shadow-lg">
            Comprar Entradas
          </button>
        </div>
      </div>
    </div>
  );
}
