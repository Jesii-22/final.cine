import MovieDetail from "./MovieDetail";

export default async function MoviePage({ params }) {
  const { id } = await params;
  return <MovieDetail movieId={id} />;
}