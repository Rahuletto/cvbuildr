"use client";
import React, { useContext, useState } from "react";
import { ResumeContext } from "@/providers/Resume";
import { SiGooglegemini } from "react-icons/si";
import { FaUndo } from "react-icons/fa";

const Summary = () => {
  const { resumeData, handleChange, setResumeData } = useContext(ResumeContext);
  const [isRewriting, setIsRewriting] = useState(false);
  const [prev, setPrev] = useState<string>("");

  async function rewrite() {
    setIsRewriting(true);
    setPrev(resumeData.summary);

    fetch("/api/summary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ summary: resumeData.summary }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsRewriting(false);
        resumeData.summary = data.rewritten;
        setResumeData(resumeData);
        handleChange({
          target: {
            summary: data.rewritten,
          },
        } as any);
      });
  }

  return (
    <div className="flex flex-col gap-2 my-6">
      <div className="flex items-center justify-between">
        <h2 className="input-title">Summary</h2>
        {prev ? (
          <button
            onClick={() => {
              resumeData.summary = prev;
              setResumeData(resumeData);
              handleChange({
                target: {
                  summary: prev,
                },
              } as any);
              setPrev("");
            }}
            type="button"
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-black text-white font-semibold hover:bg-gray-800"
            disabled={isRewriting}
          >
            <FaUndo /> Undo
          </button>
        ) : (
          <button
            onClick={rewrite}
            type="button"
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-black text-white font-semibold hover:bg-gray-800"
            disabled={isRewriting}
          >
            <SiGooglegemini /> Rewrite
          </button>
        )}
      </div>
      <div className="grid-4">
        <textarea
          disabled={isRewriting}
          placeholder="Summary"
          name="summary"
          className={`w-full other-input h-48 transition-all ${
            isRewriting
              ? "bg-shimmerGradient bg-[length:400%_100%] animate-shimmer bg-clip-text text-transparent"
              : "bg-white"
          }`}
          value={resumeData.summary}
          onChange={(e) => {
            setPrev("");
            handleChange(e);
          }}
          maxLength={600}
        />
      </div>
    </div>
  );
};

export default Summary;
