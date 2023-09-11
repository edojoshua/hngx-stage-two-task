import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { Icons } from "./ui/Icons";

interface CardProps {}

const slug = "";

const Card: FC<CardProps> = ({}) => {
  return (
    <div className="flex justify-center">
      <Link href={"/movie/" + slug} className="space-y-3">
        <Image
          src="https://www.themoviedb.org/t/p/original/vVpEOvdxVBP2aV166j5Xlvb5Cdc.jpg"
          width={1000}
          height={1000}
          alt="John Wick 3"
          className="h-[320px] w-[233px] object-cover hover:scale-105 transition ease-in-out"
        />
        <div className="text-xs text-zinc-500 font-medium">
          USA, 2016 - Current
        </div>
        <div className="font-semibold text-lg">John Wick 3: Parabellum</div>
        <div className="flex justify-between text-sm">
          <div className="flex gap-2">
            <Icons.imdb />
            <span className="text-sm">86.0 / 100</span>
          </div>
          <div className="flex gap-2">
            <Icons.tomato />
            <span className="text-sm">97%</span>
          </div>
        </div>
        <div className="text-xs text-zinc-500 font-medium">
          Action, Adventure, Horror
        </div>
      </Link>
    </div>
  );
};

export default Card;
