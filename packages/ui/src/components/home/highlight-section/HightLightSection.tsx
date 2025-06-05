import "./highligh-style.css";
import HighLightCard from "./HighLightCard";

// icons
import rabbit from "../../../assets/icons/home/rabbit.svg";
import command from "../../../assets/icons/home/command.svg";
import baggage from "../../../assets/icons/home/baggage.svg";

const HightLightSection = () => {
  const card = [
    {
      title: "Track Stock",
      description:
        "Seamless Stock update upon successful order and update stock with one click.\n Track low stock with notification.",
    },
    { title: "Profit & Sale", description: "Check sale & profit with graphs. Filter it with month or year." },
    {
      title: "Track Orders",
      description: "Display All orders on each product. Filter order based on Date, Status, Payment Status.",
    },
  ];
  const colorArray: string[] = ["bg-[#9e56bf]", "bg-[#f7b721]", "bg-[#24ff24]"];
  return (
    <section className="home-section h-screen flex flex-col justify-center items-center gap-24" id="highlights">
      <h1 className=" md:text-[5rem] font-semibold text-4xl text-center">
        Effortless Control, Max Sales <br /> With OMS
      </h1>
      <div className="flex gap-8 w-full justify-center mx-md:flex-col">
        <HighLightCard
          iconBgColor={colorArray[0]!}
          iconSrc={baggage}
          title={card[0]?.title || "abc"}
          description={card[0]?.description || "xyz"}
        />
        <HighLightCard
          iconBgColor={colorArray[1]!}
          iconSrc={rabbit}
          title={card[1]?.title || "abc"}
          description={card[1]?.description || "xyz"}
        />
        <HighLightCard
          iconBgColor={colorArray[2]!}
          iconSrc={command}
          title={card[2]?.title || "abc"}
          description={card[2]?.description || "xyz"}
        />
      </div>
    </section>
  );
};

export default HightLightSection;
