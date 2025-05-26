import HeroSection from "@oms/ui/components/home/hero-section/HeroSection";
import AboutSection from "@oms/ui/components/home/about-section/AboutSection";
import NavBar from "@oms/ui/components/nav/NavBar";
import HightLightSection from "@oms/ui/components/home/highlight-section/HightLightSection";
import ServiceSection from "@oms/ui/components/home/service-section/ServiceSection";
import PriceSection from "@oms/ui/components/home/price-section/PriceSection";
import Footer from "@oms/ui/components/home/footer/Footer";
import ContactSection from "@oms/ui/components/home/contact-section/ContactSection";
import { Role } from "@oms/types/user.type";
const Home = () => {
  return (
    <>
      <NavBar />
      <main>
        <HeroSection role={Role.CUSTOMER} />
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
