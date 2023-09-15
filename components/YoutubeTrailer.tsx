"use client";
import { FC } from "react";
import Youtube from "react-youtube";
import Loader from "./Loader";

interface YoutubeTrailerProps {
  videoId: string | undefined;
}

const YoutubeTrailer: FC<YoutubeTrailerProps> = ({ videoId }) => {
  return videoId ? <Youtube videoId={videoId} /> : <Loader />;
};

export default YoutubeTrailer;
