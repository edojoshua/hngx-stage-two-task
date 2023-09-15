"use client";

import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { Button } from "./ui/Button";
import { ClientIcons } from "./ui/ClientIcons";
import Modal from "./Modal";
import YoutubeTrailer from "./YoutubeTrailer";
import { fetchBannerMovies, fetchVideoId } from "@/lib/requests";
import { useQuery } from "@tanstack/react-query";
import { getRandomNumber, truncateText } from "@/lib/utils";
import { PageLoader } from "./Loader";

interface BannerProps {}

const Banner: FC<BannerProps> = ({}) => {
  const [bannerNumber, setBannerNumber] = useState<number>(1);
  const [activeNav, setActiveNav] = useState<number>(1);

  const {
    data: movies,
    refetch,
    isFetched,
    isFetching,
  } = useQuery({
    queryFn: () => fetchBannerMovies(),
    queryKey: ["banner-movies"],
    enabled: true,
  });

  const selectedMovie = movies && movies[bannerNumber - 1];
  // console.log(selectedMovie)

  const [toggleModal, setToggleModal] = useState<boolean>(false);

  const handleModal = () => {
    setToggleModal((prevState) => !prevState);
  };

  console.log(selectedMovie?.id);

  const { data: videoId } = useQuery({
    queryFn: () => fetchVideoId(selectedMovie?.id?.toString() || ""),
    queryKey: ["video-by-id"],
    enabled: true,
  });

  console.log(videoId);

  const tomatoScore = getRandomNumber();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBannerNumber((prevNumber) => (prevNumber % 10) + 1);
    }, 10000); 

    return () => {
      clearInterval(intervalId);
    };
  }, []); 

  const handleBannerNumberChange = (number: number) => {
    setBannerNumber(number);
    setActiveNav(number); // Update active navigation span
  };

  return (
    <div className="text-white h-[90vh] overflow-hidden relative bg-black bg-opacity-50">
      {isFetching && <PageLoader />}
      {isFetched && (
        <>
          {toggleModal && (
            <Modal toggleModal={handleModal}>
              <YoutubeTrailer videoId={videoId} />
            </Modal>
          )}
          <Image
            src={
              "https://image.tmdb.org/t/p/original" +
              selectedMovie?.backdrop_path
            }
            width={3840}
            height={2160}
            alt={selectedMovie ? selectedMovie?.title : ""}
            className="h-full w-full object-cover object-center absolute z-[-3]"
          />
          <div className="h-full w-full flex flex-col md:flex-row items-center justify-center md:justify-between wrapper">
            <div className="space-y-5 max-w-xs md:max-w-sm">
              <h2 className="font-semibold text-3xl md:text-5xl">
                {selectedMovie?.title}
              </h2>
              <div className="flex gap-6">
                <div className="flex gap-2">
                  <ClientIcons.imdb />
                  <span className="text-sm">
                    {selectedMovie?.vote_average} / 10
                  </span>
                </div>
                <div className="flex gap-2">
                  <ClientIcons.tomato />
                  <span className="text-sm">{`${tomatoScore}%`}</span>
                </div>
              </div>
              <p className="font-medium text-xs md:text-base">
                {truncateText(selectedMovie ? selectedMovie?.overview : "", 35)}
              </p>
              <Button
                className={`bg-[#BE123C] space-x-2`}
                onClick={handleModal}
              >
                <ClientIcons.play />
                <span className="font-medium">WATCH TRAILER</span>
              </Button>
            </div>

            <div className="flex gap-2 md:flex-col absolute md:relative bottom-6 font-medium text-sm">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
                <span
                  key={number}
                  className={`${
                    number === activeNav ? "text-xl opacity-100" : "opacity-60"
                  } hover:text-xl hover:opacity-100 cursor-pointer`}
                  onClick={() => handleBannerNumberChange(number)}
                >
                  {number}
                </span>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Banner;
