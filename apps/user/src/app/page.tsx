import HeroSection from "@oms/ui/components/home/hero-section/HeroSection";
import AboutSection from "@oms/ui/components/home/about-section/AboutSection";
import NavBar from "@oms/ui/components/nav/NavBar";
import HightLightSection from "@oms/ui/components/home/highlight-section/HightLightSection";
import ServiceSection from "@oms/ui/components/home/service-section/ServiceSection";
import PriceSection from "@oms/ui/components/home/price-section/PriceSection";
const Home = () => {
  return (
    <>
      <NavBar />
      <main>
        <HeroSection />
        <AboutSection />
        <HightLightSection />
        <ServiceSection />
        <PriceSection />
      </main>
    </>
  );
};

export default Home;
