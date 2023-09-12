import { Loader2 } from "lucide-react";
import { FC } from "react";

interface LoaderProps {}

const Loader: FC<LoaderProps> = ({}) => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <Loader2 className="animate-spin" />
    </div>
  );
};

export default Loader;
