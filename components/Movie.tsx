"use client";

import { FC } from "react";
import { fetchMovieByID } from "@/lib/requests";
import { useQuery } from "@tanstack/react-query";
import Loader from "./Loader";
import Image from "next/image";
import Navbar from "./Navbar";
import { Button } from "./ui/Button";
import { convertGenreIdsToNames } from "@/lib/utils";
import { genresData } from "@/lib/db";

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
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (isFetched && !movie) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <p className="text-3xl font-bold">Error fetching movie data</p>
      </div>
    );
  }

  if (isFetched && movie) {
    return (
      <div className="h-screen py-5 w-full grid grid-cols-5">
        <div className="hidden md:flex md:col-span-1">
          <Navbar />
        </div>
        <div className="col-span-5 md:col-span-4 space-y-20 md:space-y-16 px-5">
          <div className="h-[60vh]">
            {movie.backdrop_path && (
              <Image
                src={
                  "https://image.tmdb.org/t/p/original" + movie.backdrop_path
                }
                alt={movie.title}
                width={3840}
                height={2160}
                className="object-cover h-full w-full rounded-2xl"
              />
            )}
            <div className="md:flex justify-between px-2">
              <div>
                {movie.title}
                {movie.release_date}.pg.runtime
              </div>
              {movie.genre_ids && (
                <div>{convertGenreIdsToNames(movie.genre_ids, genresData)}</div>
              )}
              <div>rating</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="col-span-1 md:col-span-2">
              {movie.overview}
              {/* directors */}
              {/* stars */}
              <div className="md:flex">
                <Button>Top rated movie #number</Button>
                {/* Awards */}
              </div>
            </div>
            <div className="flex flex-col col-span-1">
              <Button>See Showtimes</Button>
              <Button>More watch options</Button>
              {/* other image */}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default MovieData;
