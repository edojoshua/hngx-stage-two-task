"use client";

import { FC } from "react";
import { fetchMovieByID } from "@/lib/requests";
import { useQuery } from "@tanstack/react-query";

interface MovieProps {
  id: string;
}

const MovieData: FC<MovieProps> = ({ id }) => {
  const {
    data: movie,
    refetch,
    isFetched,
    isFetching,
  } = useQuery({
    queryFn: () => fetchMovieByID(id),
    queryKey: ["search-query"],
    enabled: true,
  });

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (isFetched && !movie) {
    return <div>Error fetching movie data</div>;
  }

  return (
    <div>
      {movie ? (
        <div>
          <h1 className="text-5xl font-bold">{movie.title}</h1>
        </div>
      ) : (
        <div>Movie not found</div>
      )}
    </div>
  );
};

export default MovieData;
