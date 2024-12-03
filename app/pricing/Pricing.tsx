import React, { ElementType } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { SiRazorpay } from "react-icons/si";

export default function Pricing({
  tier,
  Features,
  price,
  button,
  currency,
  onClick,
}: {
  tier: string;
  Features: ElementType;
  price: string;
  button?: string;
  currency: string;
  onClick: () => void;
}) {
  return (
    <div className="border-4 min-h-[500px] border-black w-[30%] min-w-[300px] max-w-[400px] flex-col flex justify-between items-start shadow-active p-8 bg-white">
      <div className="flex items-start justify-center gap-2 flex-col">
        <h1 className="text-base font-semibold">{tier}</h1>
        <h2 className="text-6xl font-bold mb-4">
          {currency}
          {price}
        </h2>
        <Features />
      </div>
      <button
        onClick={onClick}
        type={button == "Upgrade" ? "submit" : "button"}
        className="px-6 group w-full min-w-32 py-2 font-semibold flex items-center transition-all duration-150 justify-between bg-black rounded-full text-white"
      >
        <div className="flex items-center justify-center gap-2 group-active:gap-4 transition-all duration-150">
          {button == "Upgrade" && <SiRazorpay className="group-hover:text-base transition-all duration-150 text-[0px]" />}
          {button ?? "Select"}
        </div>
        <BsArrowRightShort className="text-3xl" />
      </button>
    </div>
  );
}
