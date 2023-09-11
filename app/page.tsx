import Banner from "@/components/Banner";
import FeaturedMovies from "@/components/FeaturedMovies";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Banner />
      <FeaturedMovies />
      <Footer />
    </main>
  );
}
