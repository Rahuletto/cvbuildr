"use client";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import pdfToText from "react-pdftotext";
import { TbFiles, TbFileSmile } from "react-icons/tb";
import { FaFilePdf, FaXmark } from "react-icons/fa6";
import { AnalysisResult } from "@/types/Analysis";
import Dialog from "./preview/Dialog";
import { TbLoader2 } from "react-icons/tb";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const [loading, setLoading] = useState("");
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [formattedText, setFormattedText] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
      setFileName(acceptedFiles[0].name);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
  });

  function reset() {
    setSelectedFile(null);
    setFileName("");
    setAnalysis(null);
    setFormattedText(null);
  }

  function extractText() {
    const file = selectedFile;
    if (!file) return;
    setLoading("Extracting..");
    pdfToText(file)
      .then((text) => {
        fetch("/api/format", {
          method: "POST",
          body: JSON.stringify({
            text: text,
          }),
        })
          .then((e) => e.json())
          .then((res) => {
            setFormattedText(JSON.stringify(res, null, 2));
            fetch("/api/analyse", {
              method: "POST",
              body: JSON.stringify(res),
            })
              .then((r) => r.json())
              .then((analysed) => {
                setAnalysis(analysed);
                setLoading("");
              });
            setLoading("Analysing...");
          });
      })
      .catch(() => console.error("Failed to extract text from pdf"));
  }

  return (
    <>
      <div
        className={`flex flex-col w-screen h-screen items-center justify-center ${
          isDragActive ? "bg-black/40" : "bg-black/0"
        } transition-all duration-200`}
      >
        <div
          {...getRootProps()}
          className={`p-4 relative flex-col gap-12 border-4 h-[40%] w-[60%] flex items-center justify-center border-black rounded-lg transition-all bg-white duration-200 ${
            isDragActive
              ? "shadow-[8px_12px_0px_0px_rgba(0,0,0,1)]"
              : selectedFile
              ? "shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]"
              : "shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
          } ${selectedFile ? "scale-90" : "scale-100"}`}
        >
          {selectedFile && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                reset();
              }}
              className="absolute -top-4 -right-4 text-white flex items-center justify-center text-xl font-semibold bg-black h-[50px] w-[50px]"
            >
              <FaXmark />
            </button>
          )}
          <input {...getInputProps()} />
          {isDragActive ? (
            <TbFileSmile className="text-8xl text-black" />
          ) : fileName ? (
            <FaFilePdf className="text-8xl text-black" />
          ) : (
            <TbFiles className="text-8xl text-black" />
          )}
          {isDragActive ? (
            <h3 className="text-center font-semibold text-2xl">
              Drop the files here ...
            </h3>
          ) : fileName ? (
            <h3 className="text-center font-semibold text-xl">
              Selected file: {fileName}
            </h3>
          ) : (
            <h3 className="text-center font-semibold text-2xl max-w-[400px]">
              Drag 'n' drop a PDF file here, or click to select one
            </h3>
          )}
        </div>

        <button
          onClick={extractText}
          className="z-10 animate-fadeIn h-[50px] flex items-center justify-center absolute bottom-40 mb-1 lg:w-[150px] w-[150px] opacity-0 text-xl font-semibold text-white hover:shadow-hover active:shadow-active font-mono bg-black overflow-hidden transition-all duration-300"
          disabled={!selectedFile}
        >
          Analyse
        </button>
      </div>

      {analysis && formattedText && (
        <Dialog
          text={formattedText}
          isOpen={!!analysis}
          onClose={() => {
            reset();
          }}
          analysis={analysis}
        />
      )}

      {loading && (
        <div
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
          className={`exclude-print print:hidden z-50 fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center transition-all duration-300 ease-in-out
      opacity-100`}
        >
          <div
            className={`bg-white flex flex-row items-center justify-center ${
              loading.startsWith("An") ? "w-[600px] py-12 gap-6" : "w-[500px] py-6 gap-4"
            } rounded-xl border-[3px] border-black shadow-[4px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden transition-all duration-300 ease-out
        scale-100 translate-y-0`}
            onClick={(e) => e.stopPropagation()}
          >
            <TbLoader2 className="animate-spin text-4xl" />
            <h1 className="text-3xl font-bold font-mono text-center">
              {loading}
            </h1>
          </div>
        </div>
      )}
    </>
  );
};

export default FileUpload;
