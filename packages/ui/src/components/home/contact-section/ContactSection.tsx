import Image from "next/image";
import circle from "../../../assets/images/pattern/circle.svg";
import box01 from "../../../assets/images/pattern/box-box01.svg";
import box02 from "../../../assets/images/pattern/box-box02.svg";
import box03 from "../../../assets/images/pattern/box-box03.svg";

import discord from "../../../assets/icons/home/discord.svg";
import "./style.css";
const ContactSection = () => {
  return (
    <section id="contact" className="relative home-section h-screen w-screen flex justify-center items-center">
      {/* bg colors */}
      <div className="bg-highlight absolute"></div>
      <div className="bg-highlight absolute"></div>

      {/* circles */}
      <Image src={circle} alt="circle" className="absolute bg-img" />
      {/* top - left */}
      <Image src={box02} alt="box" className="absolute top-[10%] left-[10%]" />
      <Image src={box03} alt="box" className="absolute top-[25%] left-[3%]" />
      {/* bottom - right */}
      <Image src={box01} alt="box" className="absolute bottom-[20%] right-[5%] w-[16%]" />
      <Image src={box02} alt="box" className="absolute bottom-[15%] right-[20%]" />

      {/* Main Written Content */}

      <div className="relative z-10 flex flex-col items-center justify-center text-white text-center">
        <h1 className="text-center text-8xl font-sans font-semibold">
          Be a Part of Our Journey <br /> In Future
        </h1>
        <p className="max-w-[70%] text-lg text-white/60 font-roboto-flex mt-4">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi impedit tenetur nesciunt nobis dolorem ea,
          harum explicabo voluptatem. Possimus fugit harum natus provident neque culpa quas eos consequatur similique
          animi!
        </p>

        <button className="btn mt-8">
          Join Us In Discord
          <Image src={discord} alt="discord" className="ml-2" />
        </button>
      </div>
    </section>
  );
};

export default ContactSection;
