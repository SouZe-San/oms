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

      <section className="mt-24 flex max-md:flex-col">
        <aside className="flex-1 flex flex-col items-end max-md:items-center max-md:mb-6 ">
          <div
            style={{
              width: "30rem",
              aspectRatio: "6/8",
            }}
          ></div>
          <ServiceCard extraClass="-translate-y-16 md:block hidden" imgSrc={order} cardNumber={2} />
        </aside>
        <aside className="flex-1 flex flex-col md:pl-6 max-md:items-center">
          <ServiceCard imgSrc={scan} cardNumber={1} />
          <ServiceCard extraClass="md:hidden mt-6" imgSrc={order} cardNumber={2} />
          <ServiceCard extraClass="mt-6" imgSrc={bills} cardNumber={3} />
        </aside>
      </section>
    </section>
  );
};

export default ServiceSection;
