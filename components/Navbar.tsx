import Link from "next/link";
import { FC } from "react";
import { Icons } from "./ui/Icons";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <div className="flex flex-col space-y-5 py-5 border border-zinc-400 rounded-r-3xl">
      <div>
        <Link
          href="/"
          className="font-semibold text-xl flex items-center space-x-5 md:space-x-7"
        >
          <Icons.logo className="w-28 md:w-auto" />
        </Link>
      </div>
      <div className="flex gap-2">
        <Icons.home />
        <span>Home</span>
      </div>
      <div className="flex gap-2">
        <Icons.movieProjector />
        <span>Movies</span>
      </div>
      <div className="flex gap-2">
        <Icons.tvSeries />
        <span>TV Series</span>
      </div>
      <div className="flex gap-2">
        <Icons.calendar />
        <span>Upcoming</span>
      </div>

      <div>
        <h4>Play movie quizes and earn free tickets</h4>
        <p>10k people are playing now</p>
      </div>

      <div className="flex gap-2">
        <Icons.logOut />
        <span>Log Out</span>
      </div>
    </div>
  );
};

export default Navbar;
