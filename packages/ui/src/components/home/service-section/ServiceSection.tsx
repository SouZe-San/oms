import ServiceCard from "./ServiceCard";
import "./style.css";

// import images
import bills from "../../../assets/images/home/services/notice-model.png";
import order from "../../../assets/images/home/services/order-mode.png";
import scan from "../../../assets/images/home/services/60739b2da.png";

const ServiceSection = () => {
  return (
    <section className="home-section min-h-[50vh] pb-4" id="services">
      <h3 className="w-full text-center text-xl text-white/60 uppercase">
        [ <span>Ready To Get Started</span> ]
      </h3>
      <h1 className="w-ful text-center text-7xl">What we&rsquo;r Actually Cooking</h1>

      <section className="mt-24 flex max-sm:flex-col">
        <aside className="flex-1 flex flex-col items-end max-sm:mb-6">
          <div
            style={{
              width: "30rem",
              aspectRatio: "6/8",
            }}
          ></div>
          <ServiceCard extraClass="-translate-y-16" imgSrc={order} imgDivClass="pt-8" />
        </aside>
        <aside className="flex-1 md:pl-6">
          <ServiceCard imgSrc={scan} extraClass="pt-4" imgDivClass="-mt-12" />
          <ServiceCard extraClass="mt-6" imgSrc={bills} />
        </aside>
      </section>
    </section>
  );
};

export default ServiceSection;
