import cardSvg from "../../../assets/images/pattern/card.svg";
import Image from "next/image";

import { StaticImport } from "next/dist/shared/lib/get-img-props";
const HighLightCard = ({
  iconBgColor,
  iconSrc,
  title,
  description,
}: {
  iconBgColor: string;
  iconSrc: string | StaticImport;
  title: string;
  description: string;
}) => {
  return (
    <article>
      <Image src={cardSvg} alt="card" className="card-svg" style={{ width: "100%" }} />
      <div className="inner-part">
        <div>
          <h1 className="card-title text-4xl mt-4 font-sans font-semibold">{title}</h1>
          <p
            className="mt-4 text-white/60 font-neue"
            style={{
              lineHeight: "1.3",
            }}
          >
            {description}
          </p>
        </div>
        <div className="flex justify-between pr-3 items-center">
          <div className={`card-icon ${iconBgColor}`}>
            <Image src={iconSrc} alt="rabbit" className="w-8 text-white" />
          </div>
          <div className="arrow"> -- </div>
        </div>
      </div>
    </article>
  );
};

export default HighLightCard;
