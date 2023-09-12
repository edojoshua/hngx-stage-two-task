import { Icons } from "./ui/Icons";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="wrapper flex items-center justify-center py-10">
      <div className="w-[95%] md:w-1/3 space-y-4 md:space-y-7 font-semibold text-xs md:text-sm">
        <div className="flex items-center justify-evenly">
          <Icons.facebook />
          <Icons.instagram />
          <Icons.twitter />
          <Icons.youtube />
        </div>
        <div className="w-full flex items-center justify-between">
          <span>Conditions of Use</span>
          <span>Privacy Policy</span>
          <span>Press Room</span>
        </div>
        <div className="text-center text-zinc-500">
          © {currentYear} MovieBox by Joshua Edo
        </div>
      </div>
    </footer>
  );
};

export default Footer;
