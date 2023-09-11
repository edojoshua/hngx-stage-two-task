import { FC } from "react";
import Card from "./Card";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface FeaturedMoviesProps {}

const FeaturedMovies: FC<FeaturedMoviesProps> = ({}) => {
  return (
    <div className="min-h-screen wrapper">
      <div className="flex justify-between py-9">
        <h2 className="font-semibold text-2xl">Featured Movies</h2>
        <Link href="#featured" className="flex font-medium text-[#BE123C]">
          <span>See more</span>
          <ChevronRight />
        </Link>
      </div>
      <div className="pb-[9vh] grid gap-14 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default FeaturedMovies;
