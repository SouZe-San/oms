import x from "../../../assets/icons/home/x.svg";
import discord from "../../../assets/icons/home/discord.svg";
import wp from "../../../assets/icons/home/wp.svg";
import mail from "../../../assets/icons/home/mail.svg";
import Image from "next/image";
const socials = [discord, wp, x];

// style
import "./style.css";
const Footer = () => {
  return (
    <>
      <div className="my-8 px-16 flex justify-between items-center">
        <div className="logo">
          <span>OMS</span>
        </div>

        <div>
          <p className="text-white/60 text-end">We are here to help you</p>
          <p
            className="flex items-center  text-white/60 gap-4 mt-2"
            style={{
              padding: "5px 1.5rem",
              //   background: "#734d691a",
              background: "white",
              borderRadius: "2rem",
            }}
          >
            <Image src={mail} alt="social" className="w-6 h-6 invert" />

            <code>
              <a href="mailto:someAvail@tnu.in">allhelp@temp.mail</a>
            </code>
          </p>
        </div>
      </div>
      <hr />
      <footer className="flex justify-between items-center md:px-8 max-sm:flex-col max-sm:items-start max-sm:px-4  py-4">
        <h3 className="text-sm text-gray-500 uppercase">
          copyright &copy; 2025 <span className="font-bold">oms</span> No rights reserved
        </h3>

        <div className="flex gap-4">
          {socials.map((social, index) => (
            <div key={index} className="social-icon">
              <Image src={social} alt="social" className="w-6 h-6 cursor-pointer" />
            </div>
          ))}
        </div>
      </footer>
    </>
  );
};

export default Footer;
