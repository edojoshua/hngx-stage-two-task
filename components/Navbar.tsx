import Link from "next/link";
import { FC } from "react";
import { Icons } from "./ui/Icons";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <div className="flex flex-col space-y-14 py-5 text-[#808080]">
        <Link
          href="/"
          className="flex items-center bg-[#414141] rounded-full"
        >
          <Icons.logo className="w-full object-contain py-7"  />
        </Link>
      <div className="font-semibold text-xl">
        <div className="flex gap-4 pb-7 pl-6 items-center">
          <Icons.home />
          <span>Home</span>
        </div>
        <div className="flex gap-4 py-7 pl-6 items-center">
          <Icons.movieProjector />
          <span>Movies</span>
        </div>
        <div className="flex gap-4 py-7 pl-6 items-center">
          <Icons.tvSeries />
          <span>TV Series</span>
        </div>
        <div className="flex gap-4 py-7 pl-6 items-center">
          <Icons.calendar />
          <span>Upcoming</span>
        </div>
      </div>

      <div className="mx-6 rounded-xl border-2 pt-10 pb-5 space-y-3 px-2">
        <h4 className="font-semibold text-sm">
          Play movie quizes and earn free tickets
        </h4>
        <p className="text-xs">50k people are playing now</p>
        <div className="font-semibold text-xs rounded-full">Start playing</div>
      </div>

      <div className="font-semibold flex gap-4 py-7 pl-6 items-center">
        <Icons.logOut />
        <span>Log Out</span>
      </div>
    </div>
  );
};

export default Navbar;
