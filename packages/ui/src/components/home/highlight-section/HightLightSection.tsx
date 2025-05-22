import "./highligh-style.css";
import HighLightCard from "./HighLightCard";

// icons
import rabbit from "../../../assets/icons/home/rabbit.svg";
import command from "../../../assets/icons/home/command.svg";
import baggage from "../../../assets/icons/home/baggage.svg";

const HightLightSection = () => {
  const colorArray: string[] = ["bg-[#9e56bf]", "bg-[#f7b721]", "bg-[#24ff24]"];
  return (
    <section className="home-section h-screen flex flex-col justify-center items-center gap-24" id="highlights">
      <h1 className=" md:text-[5rem] font-semibold text-4xl text-center">
        Effortless Control, Max Sales <br /> With OMS
      </h1>
      <div className="flex gap-8 w-full justify-center mx-md:flex-col">
        <HighLightCard iconBgColor={colorArray[0]!} iconSrc={baggage} />
        <HighLightCard iconBgColor={colorArray[1]!} iconSrc={rabbit} />
        <HighLightCard iconBgColor={colorArray[2]!} iconSrc={command} />
      </div>
    </section>
  );
};

export default HightLightSection;
