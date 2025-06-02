import img from "../../../assets/images/home/about/admin-dashboard.png";
import "./about-style.css";
import Image from "next/image";
const AboutSection = () => {
  return (
    <section className="flex flex-col items-center about-section relative pb-40">
      <div className="w-[75%] about-img">
        <Image src={img} alt="about" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </div>

      <div className="flex flex-col items-start justify-center h-full mt-28">
        <p className="mt-4 text-lg text-center text-white/70 font-neue">
          Streamline the shopping process for your customers and stay informed with detailed reports on sales
          performance and inventory status.
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
