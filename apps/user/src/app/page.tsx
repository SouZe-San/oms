import HeroSection from "@oms/ui/components/home/hero-section/HeroSection";
import AboutSection from "@oms/ui/components/home/about-section/AboutSection";
import NavBar from "@oms/ui/components/nav/NavBar";
const Home = () => {
  return (
    <>
      <NavBar />
      <main className="">
        <HeroSection />
        <AboutSection />
      </main>
    </>
  );
};

export default Home;
