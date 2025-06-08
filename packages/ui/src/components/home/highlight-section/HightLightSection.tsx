import "./highligh-style.css";
import HighLightCard from "./HighLightCard";

// icons
import rabbit from "../../../assets/icons/home/rabbit.svg";
import command from "../../../assets/icons/home/command.svg";
import baggage from "../../../assets/icons/home/baggage.svg";

const HightLightSection = () => {
  const card = [
    {
      title: "What Am I",
      description:
        "OMS application designed to streamline the product management & getting the product with one click.",
    },
    {
      title: "Profit & Sale",
      description:
        "Effortlessly track sales, profits, stock levels, and orders with real-time updates, detailed filters, and low-stock alerts—all in one easy-to-use dashboard.",
    },
    {
      title: "Why Me",
      description:
        "This OMS streamlines product management, order tracking, and sales growth—offering a fast, accurate, and easy solution designed to simplify your business and support its growth..",
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
          title={card[1]!.title}
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
