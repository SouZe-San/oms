import cardSvg from "../../../assets/images/pattern/card.svg";
import Image from "next/image";

import { StaticImport } from "next/dist/shared/lib/get-img-props";
const HighLightCard = ({ iconBgColor, iconSrc }: { iconBgColor: string; iconSrc: string | StaticImport }) => {
  return (
    <article>
      <Image src={cardSvg} alt="card" className="card-svg" style={{ width: "100%" }} />
      <div className="inner-part">
        <div>
          <h1 className="card-title text-4xl mt-4 font-sans font-semibold">Card - Title</h1>
          <p className="mt-4 text-white/60 text-sm font-neue">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis, eos Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. In nemo pariatur voluptatem rem consectetur quas a quis culpa, illum nobis?
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
