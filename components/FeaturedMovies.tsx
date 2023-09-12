"use client";

import { FC } from "react";
import Card from "./Card";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchTop10Movies } from "@/lib/requests";

interface FeaturedMoviesProps {}

const FeaturedMovies: FC<FeaturedMoviesProps> = ({}) => {
  const {
    data: movies,
    refetch,
    isFetched,
    isFetching,
  } = useQuery({
    queryFn: () => fetchTop10Movies(),
    queryKey: ["search-query"],
    enabled: true,
  });

  return (
    <div className="min-h-screen wrapper">
      <div className="flex justify-between py-9">
        <h2 className="font-semibold text-2xl">Featured Movies</h2>
        <Link href="#featured" className="flex font-medium text-[#BE123C]">
          <span>See more</span>
          <ChevronRight />
        </Link>
      </div>
      {movies && movies.length > 0 && (
        <div className="pb-[9vh] grid gap-14 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {(() => {
            const cards = [];
            for (let i = 0; i < 10; i++) {
              if (movies[i]) {
                cards.push(<Card key={movies[i].id} movie={movies[i]} />);
              }
            }
            return cards;
          })()}
        </div>
      )}
    </div>
  );
};

export default FeaturedMovies;
