import "./hero-style.css";
import { openSans } from "@oms/utils/fonts";
import HomeButton from "../../button/HomeButton";
const HeroSection = () => {
  return (
    <section className="pt-nav w-screen home-section h-screen flex max-md:flex-col relative hero-section">
      <aside className="flex flex-col items-start justify-center h-full ">
        <h1 className="text-4xl font-bold text-left hero-text" style={openSans.style}>
          {/* Grow Smarter,Sell Faster.Power Up with ShopFlow */}
          Manage with <br /> Control, <br />
          Shop with Confidence
        </h1>
        <p className="mt-4 text-lg text-left">
          From product management to checkout, streamline every step of your order process.
        </p>
        <div>
          <HomeButton href="/products" title="Shop Now" extraClass="mt-8" />
        </div>
      </aside>
      <aside className="flex items-center justify-center h-full flex-1">
        <div className="hero-img-section"></div>
      </aside>
    </section>
  );
};

export default HeroSection;
