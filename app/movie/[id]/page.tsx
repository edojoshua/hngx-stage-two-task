import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MovieData from "@/components/Movie";
import { FC } from "react";

interface MoviePageProps {
  params: { id: string };
}

const MoviePage: FC<MoviePageProps> = ({ params }) => {
  const { id } = params;

  return (
    <>
      <div className="md:hidden">
        <Header />
      </div>
      <MovieData id={id} />
      <div className="md:hidden">
        <Footer />
      </div>
    </>
  );
};

export default MoviePage;
