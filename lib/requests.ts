import { Genre, Movie, Video } from "@/types/tmdb";
import { axiosInstance } from "./axios";
import { toast } from "@/hooks/use-toast";

export const fetchTop10Movies = async () => {
  try {
    const response = await axiosInstance.get("/movie/top_rated", {
      params: {
        include_adult: "true",
        include_video: "false",
        language: "en-US",
        page: "1",
        primary_release_year: "2023",
        sort_by: "popularity.desc",
      },
    });

    // console.log(response.data.results);
    return response.data.results as Movie[];
  } catch (error) {
    toast({
      description: "Error fetching movies",
      variant: "destructive",
    });
    console.error("Error fetching movies:", error);
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
    toast({
      description: "Error fetching movies",
      variant: "destructive",
    });
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const fetchMovieByID = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/movie/${id}`, {
      params: {
        language: "en-US",
      },
    });
    // console.log(response.data);
    return response.data as Movie;
  } catch (error) {
    toast({
      description: "Error fetching movies",
      variant: "destructive",
    });
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const fetchGenreData = async () => {
  try {
    const response = await axiosInstance.get(`/genre/movie/list`, {
      params: {
        language: "en-US",
      },
    });
    // console.log(response.data.genres);
    return response.data.genres as Genre[];
  } catch (error) {
    toast({
      description: "Error fetching movies",
      variant: "destructive",
    });
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const fetchVideoId = async (movieId: string) => {
  try {
    const response = await axiosInstance.get(
      `/movie/${movieId}/videos?&append_to_response=videos`
    );
    // console.log(response.data.results);
    const video = response.data.results.find(
      (result: Video) => result.name === "Official Trailer"
    );
    const videoId = video ? video.key : response.data.results[0]?.key || "";
    console.log(videoId);
    return videoId as string;
  } catch (error) {
    toast({
      description: "Error fetching movies",
      variant: "destructive",
    });
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const fetchBannerMovies = async () => {
  try {
    const response = await axiosInstance.get("/discover/movie", {
      params: {
        include_adult: "true",
        include_video: "false",
        language: "en-US",
        page: "1",
        primary_release_year: "2023",
        sort_by: "popularity.desc",
      },
    });

    // console.log(response.data.results);
    return response.data.results as Movie[];
  } catch (error) {
    toast({
      description: "Error fetching movies",
      variant: "destructive",
    });
    console.error("Error fetching movies:", error);
    throw error;
  }
};
