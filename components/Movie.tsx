"use client";

import { FC, useState } from "react";
import { fetchMovieByID, fetchVideoId } from "@/lib/requests";
import { useQuery } from "@tanstack/react-query";
import Loader from "./Loader";
import Image from "next/image";
import Navbar from "./Navbar";
import { Button } from "./ui/Button";
import {
  convertGenreIdsToNames,
  formatPopularity,
  formatRuntime,
  formatVoteAverage,
  formatVoteCount,
  getMovieRating,
} from "@/lib/utils";
import { genresData } from "@/lib/db";
import { Icons } from "./ui/Icons";
import YoutubeTrailer from "./YoutubeTrailer";
import Modal from "./Modal";

interface MovieProps {
  id: string;
}

const MovieData: FC<MovieProps> = ({ id }) => {
  const [toggleModal, setToggleModal] = useState<boolean>(false);

  const handleModal = () => {
    setToggleModal((prevState) => !prevState);
  };

  const {
    data: movie,
    isFetched,
    isFetching,
  } = useQuery({
    queryFn: () => fetchMovieByID(id),
    queryKey: ["movie-by-id"],
    enabled: true,
  });

  const { data: videoId } = useQuery({
    queryFn: () => fetchVideoId(id),
    queryKey: ["video-by-id"],
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
      <div className="h-screen w-full flex items-center justify-center px-5">
        <p className="text-3xl font-bold">Error fetching movie data</p>
      </div>
    );
  }

  if (isFetched && movie) {
    const runtime = formatRuntime(movie.runtime);
    const date = new Date(movie.release_date);
    const UTCString = new Date(date).toUTCString();

    return (
      <div className="min-h-screen w-full grid grid-cols-7 py-10 text-white">
        {toggleModal && (
          <Modal toggleModal={handleModal}>
            <YoutubeTrailer videoId={videoId} />
          </Modal>
        )}
        <div className="hidden md:flex md:col-span-1 border border-zinc-400 rounded-r-3xl">
          <Navbar />
        </div>

        <div className="col-span-7 md:col-span-6 px-4 md:px-10 text-[#414141]">
          <div className="h-auto md:h-[70vh]">
            {movie.backdrop_path && (
              <div className="w-full h-full relative">
                <div className="cursor-pointer w-20 h-20 absolute m-auto left-0 right-0 top-0 bottom-0 rounded-[50%] flex items-center justify-center z-[1] overflow-hidden favorite">
                  <Icons.play className="" onClick={handleModal} />
                </div>
                <Image
                  src={
                    "https://image.tmdb.org/t/p/original" + movie.backdrop_path
                  }
                  alt={movie.title}
                  width={3840}
                  height={2160}
                  data-testid="movie-poster"
                  className="object-cover h-full w-full rounded-2xl"
                />
              </div>
            )}

            <div className="md:flex justify-between text-base md:text-xl pt-5 md:pt-8 font-medium">
              <div>
                <span data-testid="movie-title">{movie.title}</span> •{" "}
                <span data-testid="movie-release-date">{UTCString}</span> •{" "}
                {getMovieRating(movie?.genre_ids)} •{" "}
                <span data-testid="movie-runtime">{runtime}</span>
              </div>
              {movie.genre_ids && (
                <div>{convertGenreIdsToNames(movie.genre_ids, genresData)}</div>
              )}
              <div className="flex gap-1">
                <span className="flex gap-2">
                  <span className="font-normal flex items-center justify-center">
                    {" "}
                    <Icons.star />
                  </span>
                  <span className="opacity-30">
                    {formatVoteAverage(movie.vote_average)}
                  </span>
                </span>{" "}
                |{" "}
                <span className="text-base font-normal flex items-end justify-center">
                  <span>{formatVoteCount(movie.vote_count)}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-7 mt-4 md:mt-20">
            <div className="pr-4 col-span-1 md:col-span-5 text-sm md:text-lg space-y-6 text-[#414141]">
              <p data-testid="movie-overview">{movie.overview}</p>
              <p>
                Director: <span className="text-[#BE123C]">Joshua Edo</span>
              </p>
              <p>
                Writers:{" "}
                <span className="text-[#BE123C]">Josh, Aniekan and Thomas</span>{" "}
              </p>
              <div className="md:flex">
                <Button className="py-5 text-base md:text-lg bg-[#BE123C]">
                  Top rated movie #{formatPopularity(movie.popularity)}
                </Button>
              </div>
            </div>
            <div className="mt-5 md:mt-1 flex flex-col col-span-2 space-y-5">
              <Button className="py-5 text-base md:text-lg bg-[#BE123C] flex gap-2">
                <Icons.ticket />
                See Showtimes
              </Button>
              <Button className="flex gap-2 py-5 text-base md:text-lg bg-[#F9E8EC] border text-zinc-700 border-[#BE123C]">
                <Icons.list />
                More watch options
              </Button>
              <Icons.helsinki />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default MovieData;
