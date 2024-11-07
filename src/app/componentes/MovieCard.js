export default function MovieCard({ movie }) {
    return (
      <div className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-60">
        <div
          className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded flex flex-col"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
          }}
        ></div>
        <p className="text-[#FFFFFF] text-base font-medium leading-normal">{movie.title}</p>
      </div>
    );
  }
  