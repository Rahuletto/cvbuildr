import { ATSResult } from "@/types/Analysis";
import React, { useEffect, useState } from "react";
import { BiAnalyse } from "react-icons/bi";
import { CgFormatLeft, CgScan } from "react-icons/cg";
import { SiGooglegemini, SiHuggingface } from "react-icons/si";

export default function Dialog({
  isOpen,
  onClose,
  analysis,
  text,
}: {
  isOpen: boolean;
  onClose: () => void;
  analysis: ATSResult;
  text?: string;
}) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const confidenceScore = analysis ? analysis.overallScore.confidence : 0;
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
      className={`exclude-print print:hidden p-2 animate-fadeIn z-50 fixed inset-0 bg-black/60 backdrop-blur-md flex flex-col xl:flex-row gap-4 items-center justify-around transition-all duration-300 ease-in-out
        ${isOpen ? "opacity-100" : "opacity-0"}`}
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()} className="md:w-[96%] overflow-auto md:h-[96%] w-full h-full transition-all duration-150 bg-white rounded-2xl border-4 border-black shadow-active flex lg:flex-row flex-col">
        <div className="lg:w-[300px] lg:sticky pt-12 p-6 items-center justify-around lg:justify-start flex gap-14 lg:flex-col md:flex-row flex-col bg-gradient-to-b from-gray-100 to-white border-black lg:border-r-4 border-b-4 lg:border-b-0 lg:!rounded-l-2xl rounded-t-2xl lg:rounded-t-none">
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
          <img style={{ animationDelay: "1.2s" }} src="/mascot.svg" className="fixed z-20 lg:w-12 w-8 -rotate-3 hover:-rotate-12 top-8 left-8 md:left-16 md:top-12 transition-all duration-150 animate-fadeIn opacity-0" />
          <div className="flex flex-col min-w-[250px]">
            <div className="border-b flex justify-between items-baseline mt-8 border-black pl-4">
              <p className="font-mono text-sm">Summary</p>
              <span className="px-4 py-2 bg-black text-white font-mono">{analysis.summary?.confidence?.toFixed(2)}%</span>
            </div>

            <div className="border-b flex justify-between items-baseline mt-8 border-black pl-4">
              <p className="font-mono text-sm">Experience</p>
              <span className="px-4 py-2 bg-black text-white font-mono">{analysis.workExperience?.confidence?.toFixed(2)}%</span>
            </div>

            <div className="border-b flex justify-between items-baseline mt-8 border-black pl-4">
              <p className="font-mono text-sm">Skills</p>
              <span className="px-4 py-2 bg-black text-white font-mono">{analysis.skills?.score?.toFixed(2)}%</span>
            </div>

            <div className="border-b flex justify-between items-baseline mt-8 border-black pl-4">
              <p className="font-mono text-sm">Projects</p>
              <span className="px-4 py-2 bg-black text-white font-mono">{analysis.projects?.confidence?.toFixed(2)}%</span>
            </div>

          </div>
        </div>
        <div className="p-6 flex flex-col gap-12 w-full lg:overflow-auto">
          <div className="flex flex-col gap-4">
            <span className="flex gap-2 text-2xl font-semibold items-center"><BiAnalyse /> Analysis</span>
            <div className="flex flex-row gap-3 justify-between md:flex-nowrap flex-wrap">
              <div className="border-b flex justify-between items-baseline w-full border-black pl-4">
                <p className="font-mono text-sm">Meaningfull</p>
                <span className="px-4 py-2 bg-black text-white font-mono">{analysis.semanticAnalysis?.score?.toFixed(2)}%</span>
              </div>

              <div className="border-b flex justify-between items-baseline w-full border-black pl-4">
                <p className="font-mono text-sm">Completeness</p>
                <span className="px-4 py-2 bg-black text-white font-mono">{analysis.sectionCompleteness?.completenessScore?.toFixed(2)}%</span>
              </div>

              <div className="border-b flex justify-between items-baseline w-full border-black pl-4">
                <p className="font-mono text-sm">Relevance</p>
                <span className="px-4 py-2 bg-black text-white font-mono">{analysis.keywordMatching.matchScore}%</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 border-b border-black">
            <div className="flex flex-row gap-6 justify-between items-center">
              <span className="flex gap-2 text-2xl font-semibold items-center"><CgFormatLeft /> Formatting</span>
              <span className="px-4 py-2 bg-black text-white font-mono">{analysis.formatting?.score?.toFixed(2)}%</span>
            </div>
            {
              analysis.formatting?.issues?.[0] && (
                <div className="ml-6 relative pl-6 pb-3 pt-3 border-l-2 border-black">
                  {
                    analysis.formatting.issues.map((issue, index) => (
                      <span key={index} className="ml-2 before:content-[''] before:w-2 before:h-2 before:ml-3 before:mt-2 before:bg-black before:flex before:absolute before:left-0 text-base">
                        {issue}
                      </span>
                    ))
                  }
                </div>
              )
            }
          </div>
          <div className="flex flex-col gap-4 mt-8">
            <span className="flex gap-2 text-2xl font-semibold items-center"><SiGooglegemini /> Suggestions</span>
            <div className="flex flex-col gap-8">
              {
                Object.entries(analysis.suggestions).map(([key, value], index) => (
                  Array.isArray(value) && value.length > 0 ? (
                    <div key={index} className="flex flex-col gap-2">
                      <span className="text-lg font-semibold capitalize underline">{key}</span>
                      <div className="pl-6 border-l-4 border-black relative flex flex-col gap-5">
                        {value.map((suggestion, subIndex) => (
                          <div key={subIndex} className="ml-2 before:content-[''] py-1 text-justify before:w-2 before:h-2 before:ml-3 before:mt-2 before:bg-black before:flex before:absolute before:left-0 text-base font-medium">{suggestion}</div>
                        ))}
                      </div>
                    </div>
                  ) : null
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}