"use client";

import { FC, useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { Icons } from "./ui/Icons";
import Link from "next/link";

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  const [show, handleShow] = useState<boolean>(false);

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);

  return (
    <header
      className={`${
        show && "bg-black"
      } wrapper flex justify-between items-center text-white fixed top-0 py-4 w-full z-[1]`}
    >
      <Link
        href="/"
        className="font-semibold text-xl flex items-center space-x-5 md:space-x-7"
      >
        <Icons.logo />
      </Link>
      <div className="hidden md:flex">
        <SearchBar />
      </div>
      <div className="px-2 py-1 font-semibold flex items-center space-x-5 md:space-x-7">
        <span>Sign In</span>
        <Icons.menu />
      </div>
    </header>
  );
};

export default Header;
