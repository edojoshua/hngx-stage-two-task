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

export function getMovieRating(genreIds: number[] | undefined): string {
  let rating = "PG";
  genreIds?.forEach((genreId) => {
    if (ratingMappings[genreId]) {
      rating = ratingMappings[genreId];
    }
  });

  return rating;
}

export function truncateText(text: string, maxWords: number) {
  const words = text.split(" ");
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(" ") + " ...";
  } else {
    return text;
  }
}

export function formatVoteCount(voteCount: number | undefined): string {
  if (typeof voteCount !== "number" || isNaN(voteCount)) {
    return "";
  }

  if (voteCount >= 1000) {
    const formattedCount = (voteCount / 1000).toFixed(1);
    return `${formattedCount}k`;
  } else {
    return voteCount.toString();
  }
}

export function formatPopularity(popularity: number | undefined): string {
  if (typeof popularity !== "number" || isNaN(popularity)) {
    return "";
  }

  return Math.round(popularity).toString();
}

export function formatVoteAverage(voteAverage: number | undefined): string {
  if (typeof voteAverage !== "number" || isNaN(voteAverage)) {
    return "";
  }

  return voteAverage.toFixed(1);
}
