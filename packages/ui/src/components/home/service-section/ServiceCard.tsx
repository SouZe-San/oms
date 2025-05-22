import Image from "next/image";
import bg from "../../../assets/images/pattern/grid.svg";

import { StaticImport } from "next/dist/shared/lib/get-img-props";

const ServiceCard = ({
  cardNumber = 1,

  extraClass = "",
  imgSrc,
  imgDivClass = "img-div",
}: {
  cardNumber: number;

  extraClass?: string;
  imgSrc: string | StaticImport;
  imgDivClass?: string;
}) => {
  return (
    <div className={`relative service-card ${extraClass}`}>
      <div className="w-full card-bg">
        <Image
          src={bg}
          alt="grid"
          style={{
            objectFit: "cover",
          }}
        />
      </div>

      <div className="inner-bod absolute top-0 left-0 w-full h-full flex flex-col justify-evenly">
        <div className="min-h-[60%]">
          <div className="pt-3 pl-12">
            <h3 className="text-[14px] text-white/60 font-thin font-roboto-flex" style={{ letterSpacing: "5px" }}>
              <span className=" text-blue-500">[ </span>0{cardNumber}
              <span className=" text-blue-500"> ]</span>
            </h3>
          </div>
          <div className={imgDivClass}>
            <Image src={imgSrc} alt="card" style={{ objectFit: "cover" }} />
          </div>
        </div>

        <div className="down px-7">
          <h1 className="text-4xl mb-4">Card - Title in long </h1>
          <h3 className="text-white/70">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora, labore quaerat! Rem tempora quibusdam
            adipisci beatae ipsum sapiente at recusandael. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Esse, excepturi amet consectetur blanditiis perspiciatis minima dignissimos adipisci libero quod nemo!
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
