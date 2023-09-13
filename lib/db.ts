import { Genre } from "@/types/tmdb";

export const genresData: Genre[] = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]

  export const ratingMappings: { [key: number]: string } = {
    28: "PG-18",
    12: "PG",
    16: "PG",
    35: "PG",
    80: "PG-18",
    99: "PG",
    18: "PG",
    10751: "PG",
    14: "PG",
    36: "PG",
    27: "PG-18",
    10402: "PG",
    9648: "PG-13",
    10749: "PG-13",
    878: "PG-13",
    10770: "PG",
    53: "PG-13",
    10752: "PG-18",
    37: "PG",
  };
