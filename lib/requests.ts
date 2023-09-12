import { Movie } from "@/types/tmdb";
import { axiosInstance } from "./axios";

export const fetchTop10Movies = async () => {
    try {
      const response = await axiosInstance.get('/discover/movie', {
        params: {
          include_adult: 'true',
          include_video: 'false',
          language: 'en-US',
          page: '1',
          primary_release_year: '2023',
          sort_by: 'popularity.desc',
        },
      });
  
      console.log(response.data.results);
      return response.data.results as Movie[];
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;
    }
  };

  export const fetchSearchMovies = async (input: string) => {
    if (!input) return [];

    try {
      const response = await axiosInstance.get("/search/movie", {
        params: {
          query: input,
          include_adult: "false",
          language: "en-US",
          page: "1",
        },
      });

    //   console.log(response.data.results);
      return response.data.results as Movie[];
    } catch (error) {
      console.error("Error fetching movies:", error);
      throw error;
    }
  }
  

  export const fetchMovieByID = async (id: string) => {
    try {
      const response = await axiosInstance.get(`/movie/${id}`, {
        params: {
          language: "en-US",
        },
      });
      console.log(response.data);
      return response.data as Movie;
    } catch (error) {
      console.error("Error fetching movies:", error);
      throw error;
    }
  }