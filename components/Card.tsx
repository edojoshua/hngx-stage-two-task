import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { Icons } from "./ui/Icons";
import { Movie } from "@/types/tmdb"; 

interface CardProps {
  movie: Movie; 
}

const Card: FC<CardProps> = ({ movie }) => {
  return (
    <div className="flex justify-center">
      <Link href={`/movie/${movie.id}`} className="space-y-3">
        <Image
          src={`https://www.themoviedb.org/t/p/original${movie.poster_path}`}
          width={1000}
          height={1000}
          alt={movie.title}
          className="h-[320px] w-[233px] object-cover hover:scale-105 transition ease-in-out"
        />
        <div className="text-xs text-zinc-500 font-medium">
          {movie.release_date} - Current
        </div>
        <div className="font-semibold text-lg">{movie.title}</div>
        <div className="flex justify-between text-sm">
          <div className="flex gap-2">
            <Icons.imdb />
            <span className="text-sm">{movie.vote_average} / 100</span>
          </div>
          {/* Replace the following static data with movie-specific data */}
          <div className="flex gap-2">
            <Icons.tomato />
            <span className="text-sm">97%</span>
          </div>
        </div>
        <div className="text-xs text-zinc-500 font-medium">
          Action, Adventure, Horror {/* Replace with movie genres */}
        </div>
      </Link>
    </div>
  );
};

export default Card;
