import Image from "next/image";

import helsinkiPath from "@/public/pages/id.jpg";

const page = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Image src={helsinkiPath} alt="" className="w-full"/>
    </div>
  );
};

export default page;
