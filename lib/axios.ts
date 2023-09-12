import axios from "axios";

const accessToken: string | undefined =
process.env.NEXT_PUBLIC_API_READ_ACCESS_TOKEN;

export const axiosInstance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });