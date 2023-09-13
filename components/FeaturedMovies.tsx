"use client";

import { FC } from "react";
import Card from "./Card";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchTop10Movies } from "@/lib/requests";
import Loader from "./Loader";

interface FeaturedMoviesProps {}

const FeaturedMovies: FC<FeaturedMoviesProps> = ({}) => {
  const {
    data: movies,
    refetch,
    isFetched,
    isFetching,
  } = useQuery({
    queryFn: () => fetchTop10Movies(),
    queryKey: ["top-ten"],
    enabled: true,
  });

  return (
    <div className="min-h-screen wrapper">
      <div className="flex items-center justify-between py-9">
        <h2 className="font-semibold text-xl md:text-2xl">Featured Movies</h2>
        <Link href="#featured" className="flex font-medium text-[#BE123C]">
          <span>See more</span>
          <ChevronRight />
        </Link>
      </div>
      {isFetching && <Loader />}
      {isFetched && movies && movies.length > 0 && (
        <div className="pb-[9vh] place-items-center grid gap-14 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {(() => {
            const cards = [];
            const firstTenMovies = movies.slice(0, 10); 
            for (let i = 0; i < firstTenMovies.length; i++) {
              cards.push(
                <Card key={firstTenMovies[i].id} movie={firstTenMovies[i]} />
              );
            }
            return cards;
          })()}
        </div>
      )}
    </div>
  );
};

export default FeaturedMovies;
