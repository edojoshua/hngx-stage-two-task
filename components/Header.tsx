"use client";

import { FC, useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { Icons } from "./ui/Icons";
import Link from "next/link";
import { Search } from "lucide-react";
import Modal from "./Modal";

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  const [show, handleShow] = useState<boolean>(false);
  const [toggleModal, setToggleModal] = useState<boolean>(false);

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  const handleModal = () => {
    setToggleModal((prevState) => !prevState);
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
        <Icons.logo className="w-28 md:w-auto" />
      </Link>
      <div className="hidden md:flex">
        <SearchBar />
      </div>

      <div className="px-2 py-1 font-semibold flex items-center space-x-3 md:space-x-7">
        {toggleModal ? (
          <Modal toggleModal={handleModal}>
            <SearchBar />
          </Modal>
        ) : (
          <div className="flex md:hidden" onClick={handleModal}>
            <Search />
          </div>
        )}
        <span className="text-xs md:text-base">Sign In</span>
        <Icons.menu className="w-7 md:w-auto" />
      </div>
    </header>
  );
};

export default Header;
