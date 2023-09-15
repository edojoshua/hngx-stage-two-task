"use client";
import { FC } from "react";
import Youtube from "react-youtube";
import Loader from "./Loader";

interface YoutubeTrailerProps {
  videoId: string | undefined;
}

const YoutubeTrailer: FC<YoutubeTrailerProps> = ({ videoId }) => {
  return (
    <div className="mt-16 w-full h-full flex items-center justify-center">
      {videoId ? <Youtube videoId={videoId} /> : <Loader />}
    </div>
  );
};

export default YoutubeTrailer;
