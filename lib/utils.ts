import { Genre } from "@/types/tmdb";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ratingMappings } from "./db";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const themeColor: string = "#BE123C";

export function convertGenreIdsToNames(
  genreIds: number[],
  genresData: Genre[]
) {
  const genreMap = new Map(genresData.map((genre) => [genre.id, genre.name]));
  const genreNames = genreIds.map((genreId) => genreMap.get(genreId));
  const validGenreNames = genreNames.filter(Boolean);
  if (validGenreNames.length === 0) {
    return "Unknown";
  } else if (validGenreNames.length === 1) {
    return validGenreNames[0];
  } else {
    const lastGenreName = validGenreNames.pop();
    return `${validGenreNames.join(", ")} and ${lastGenreName}`;
  }
}

export const getRandomNumber = () => {
  return Math.floor(Math.random() * (98 - 68 + 1)) + 68;
};

export function extractYearFromDate(dateString: string): string {
  const year = dateString.split("-")[0];
  return year;
}

export function generateRandomRuntime(): string {
  const hours = Math.floor(Math.random() * (3 - 1 + 1)) + 1;

  const minutes =
    hours === 3
      ? Math.floor(Math.random() * 60)
      : Math.floor(Math.random() * (60 - 30 + 1)) + 30;

  const runtime = `${hours}hr ${minutes}m`;

  return runtime;
}

export function getMovieRating(genreIds: number[] | undefined): string {
  let rating = "PG";
  genreIds?.forEach((genreId) => {
    if (ratingMappings[genreId]) {
      rating = ratingMappings[genreId];
    }
  });

  return rating;
}
