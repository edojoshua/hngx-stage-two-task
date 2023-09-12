import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="wrapper flex items-center justify-center py-10">
      <div className="w-4/5 md:w-1/3 space-y-7 font-semibold text-sm md:text-base">
        <div className="flex items-center justify-evenly">
          <Facebook />
          <Instagram />
          <Twitter />
          <Youtube />
        </div>
        <div className="w-full flex items-center justify-between">
          <span>Conditions of Use</span>
          <span>Privacy Policy</span>
          <span>Press Room</span>
        </div>
        <div className="text-center text-zinc-500">
          © 2021 MovieBox by Adriana Eka Prayudha
        </div>
      </div>
    </footer>
  );
};

export default Footer;