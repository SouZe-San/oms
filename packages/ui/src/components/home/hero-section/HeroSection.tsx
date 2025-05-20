import "./hero-style.css";
import img from "../../../assets/images/home/hero/hero3.png";
import HomeButton from "../../button/HomeButton";

import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="pt-nav w-screen home-section h-screen flex max-lg:flex-col max-lg:gap-8 relative hero-section">
      <aside className="flex flex-col items-start justify-center h-full ">
        <h1 className="2xl:text-[6rem] text-4xl font-bold text-left hero-text font-sans ">
          {/* Grow Smarter,Sell Faster.Power Up with ShopFlow */}
          Manage with <br /> Control, <br />
          Shop with Confidence
        </h1>
        <p className="mt-4 text-lg text-left font-neue text-white/70">
          From product management to checkout, streamline every step of your order process.
        </p>
        <div>
          <HomeButton href="/products" title="Shop Now" extraClass="mt-8" />
        </div>
      </aside>
      <aside className="flex items-center justify-center h-full flex-1">
        <div className="hero-img-section">
          <Image
            src={img}
            alt="hero"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>
      </aside>
    </section>
  );
};

export default HeroSection;
