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
  formatVoteCount,
  generateRandomRuntime,
  getMovieRating,
} from "@/lib/utils";
import { genresData } from "@/lib/db";
import { Icons } from "./ui/Icons";
import YoutubeTrailer from "./YoutubeTrailer";
import Modal from "./Modal";
import { Star, StarIcon } from "lucide-react";

interface MovieProps {
  id: string;
}

const MovieData: FC<MovieProps> = ({ id }) => {
  const runtime: string = generateRandomRuntime();
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
      <div className="h-screen w-full flex items-center justify-center">
        <p className="text-3xl font-bold">Error fetching movie data</p>
      </div>
    );
  }

  if (isFetched && movie) {
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
        <div className="col-span-7 md:col-span-6 md:px-10 text-[#414141]">
          <div className="h-auto md:h-[70vh]">
            {movie.backdrop_path && (
              <Image
                src={
                  "https://image.tmdb.org/t/p/original" + movie.backdrop_path
                }
                alt={movie.title}
                width={3840}
                height={2160}
                className="object-cover h-full w-full rounded-2xl"
                onClick={handleModal}
              />
            )}

            <div className="md:flex justify-between text-lg md:text-xl pt-8 font-medium">
              <div>
                {movie.title} •{" "}
                {new Date(movie.release_date)
                  .toUTCString()
                  .replace(" 00:00:00 GMT", "")}{" "}
                • {getMovieRating(movie?.genre_ids)} • {runtime}
              </div>
              {movie.genre_ids && (
                <div>{convertGenreIdsToNames(movie.genre_ids, genresData)}</div>
              )}
              <div className="flex gap-3">
                <span className="flex gap-2">
                  <span className="font-normal flex items-center justify-center">
                    {" "}
                    <Icons.star />
                  </span>
                  <span className="opacity-30">{movie.vote_average}</span>
                </span>{" "}
                |{" "}
                <span className="font-normal flex items-center justify-center">
                  <span>{formatVoteCount(movie.vote_count)}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-7 mt-20">
            <div className="col-span-1 md:col-span-5 text-base md:text-lg space-y-6 text-[#414141]">
              <p>{movie.overview}</p>
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
            <div className="flex flex-col col-span-2 space-y-3">
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
