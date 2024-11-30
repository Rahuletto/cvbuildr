import { AnalysisResult } from "@/types/Analysis";
import React, { useEffect, useState } from "react";
import { RxCaretRight } from "react-icons/rx";

export default function Dialog({
  isOpen,
  onClose,
  analysis,
  text,
}: {
  isOpen: boolean;
  onClose: () => void;
  analysis: AnalysisResult;
  text?: string;
}) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const confidenceScore = analysis ? analysis.overall.confidence : 0;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setAnimatedScore(0);
      const timer = setTimeout(() => {
        setAnimatedScore(confidenceScore);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen, confidenceScore]);

  if (!isVisible && !isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className={`exclude-print print:hidden px-2 z-50 fixed inset-0 bg-black/60 backdrop-blur-md flex flex-col xl:flex-row gap-4 items-center justify-around transition-all duration-300 ease-in-out
        ${isOpen ? "opacity-100" : "opacity-0"}`}
      onClick={onClose}
    >
      <div
        className={`bg-white max-w-[450px] w-full rounded-3xl border-[3px] border-black shadow-[4px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden transition-all duration-300 ease-out
          ${isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <div className="p-12 pb-6 bg-gradient-to-b from-gray-50 to-white border-b-2 border-black/10">
          <div className="flex flex-col items-center gap-6">
            <div className="relative w-48 h-24 flex items-center justify-center">
              <svg viewBox="0 0 200 100" className="w-full h-full">
                <path
                  d="M20,100 A80,80 0 0,1 180,100"
                  stroke="#e5e5e5"
                  strokeWidth="20"
                  fill="none"
                  className="transition-all duration-300"
                />
                <path
                  d="M20,100 A80,80 0 0,1 180,100"
                  stroke="black"
                  strokeWidth="20"
                  fill="none"
                  strokeDasharray={`${(animatedScore / 100) * 251.2}, 251.2`}
                  className="transition-all duration-700 ease-out"
                />
              </svg>
              <div className="absolute top-[60%] left-1/2 -translate-x-1/2 translate-y-2">
                <span className="font-mono text-2xl font-bold tabular-nums transition-all duration-300">
                  {animatedScore.toFixed(2)}%
                </span>
              </div>
            </div>
            <div className="font-mono text-md font-medium tracking-tight transition-all duration-300">
              Overall
            </div>
          </div>
        </div>

        <div className="p-5 pr-8 bg-gray-100 max-h-[400px] overflow-y-auto">
          <div className="grid gap-6">
            {analysis &&
              Object.entries(analysis)
                .slice(0, -1)
                .map(([key, value], index) => (

                  <div className="group flex flex-col border-b border-black transition-all duration-200" key={key}>
                    <div
                      className="flex items-center justify-between pl-6 cursor-pointer"
                      onClick={() => handleToggle(index)}
                    >
                      <div className="font-mono capitalize font-medium text-md transition-all duration-300">
                        {key}
                      </div>
                      <div className="flex items-center h-full gap-3">
                        <RxCaretRight
                          className={`transition-transform duration-200 ${openIndex === index ? "rotate-90" : ""
                            }`}
                        />
                        <div className="font-mono text-md font-bold bg-black text-white px-3 py-2 h-full flex items-center justify-center group-hover:scale-105 transition-all duration-200">
                          {value.confidence.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                    {openIndex === index && (
                      <div className="pl-6 pr-8 py-2 border-l border-black transition-all duration-300">
                        <ul className="text-sm font-medium">{(value.suggestion as string).trim().split("$$").map((a: string, k: number) => (
                          a.trim() && <li className="list-disc ml-2" key={k}>{a.replace("$$", "")}</li>
                        ))}</ul>
                      </div>
                    )}
                  </div>
                ))}

          </div>
        </div>

        {/* Action Buttons */}
        {text ? (
          <div className="flex w-full border-t-2 border-black/20">
            <button
              onClick={onClose}
              className="bg-black w-full text-white font-mono py-5 text-lg font-bold
              transition-all duration-200 hover:bg-black/90 active:bg-black/80
              border-l-2 border-white/20 hover:tracking-widest"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 border-t-2 border-black/20">
            <button
              onClick={handlePrint}
              className="py-5 font-mono text-lg font-bold transition-all duration-200 
              hover:bg-black/5 active:bg-black/10 hover:tracking-widest"
            >
              Download
            </button>
            <button
              onClick={onClose}
              className="bg-black text-white font-mono py-5 text-lg font-bold
              transition-all duration-200 hover:bg-black/90 active:bg-black/80
              border-l-2 border-white/20 hover:tracking-widest"
            >
              Edit
            </button>
          </div>
        )}
      </div>

    </div >
  );
}
