import MovieData from "@/components/Movie";
import { FC } from "react";

interface MoviePageProps {
  params: { id: string };
}

const MoviePage: FC<MoviePageProps> = ({ params }) => {
  const { id } = params;

  return <MovieData id={id} />;
};

export default MoviePage;
