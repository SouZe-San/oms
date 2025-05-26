import { Role } from "@oms/types/user.type";
import AboutSection from "@oms/ui/components/home/about-section/AboutSection";
import ContactSection from "@oms/ui/components/home/contact-section/ContactSection";
import Footer from "@oms/ui/components/home/footer/Footer";
import HeroSection from "@oms/ui/components/home/hero-section/HeroSection";
import HightLightSection from "@oms/ui/components/home/highlight-section/HightLightSection";
import PriceSection from "@oms/ui/components/home/price-section/PriceSection";
import ServiceSection from "@oms/ui/components/home/service-section/ServiceSection";
import NavBar from "@oms/ui/components/nav/NavBar";

const Home = () => {
  return (
    <>
      <NavBar />
      <main>
        <HeroSection role={Role.ADMIN} />
        <AboutSection />
        <HightLightSection />
        <ServiceSection />
        <PriceSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
};

export default Home;
