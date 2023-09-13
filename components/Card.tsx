import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { Icons } from "./ui/Icons";
import { Movie } from "@/types/tmdb";
import {
  convertGenreIdsToNames,
  extractYearFromDate,
  getRandomNumber,
} from "@/lib/utils";
import { genresData } from "@/lib/db";
import Heart from "./ui/Heart";

interface CardProps {
  movie: Movie;
}

const Card: FC<CardProps> = ({ movie }) => {
  const genres = convertGenreIdsToNames(movie.genre_ids, genresData);

  const tomatoScore = getRandomNumber();

  const date = movie.release_date;
  const year = extractYearFromDate(date);

  return (
    <div className="card w-[233px] md:w-auto flex items-center justify-center relative">
      <div className="absolute rounded-[50%] top-4 right-4 flex items-center justify-center z-[2] overflow-hidden favorite">
        <Heart />
      </div>
      <Link href={`/movie/${movie.id}`} className="space-y-3">
        <Image
          src={`https://www.themoviedb.org/t/p/original${movie.poster_path}`}
          width={1000}
          height={1000}
          alt={movie.title}
          className="h-[320px] w-[233px] object-cover hover:scale-105 transition ease-in-out"
        />
        <div className="text-xs text-zinc-500 font-medium">USA, {year}</div>
        <div className="font-semibold text-lg">{movie.title}</div>
        <div className="flex justify-between text-sm">
          <div className="flex gap-2">
            <Icons.imdb />
            <span className="text-sm">{movie.vote_average} / 10</span>
          </div>
          <div className="flex gap-2">
            <Icons.tomato />
            <span className="text-sm">{`${tomatoScore}%`}</span>
          </div>
        </div>
        <div className="text-xs text-zinc-500 font-medium">{genres}</div>
      </Link>
    </div>
  );
};

export default Card;
