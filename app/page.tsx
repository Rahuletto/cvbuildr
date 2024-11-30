import Link from "next/link";
import Auth from "./components/Auth";

export default function Home() {
  return (
    <main className="flex items-center justify-center w-screen h-screen flex-col gap-16">
      <Auth />
      <div className="flex items-center justify-end lg:gap-[0.7rem] lg:bottom-[-6px] bottom-[3px] gap-[1.4rem] relative flex-col">
        <h1
          style={{ animationDelay: "0.1s" }}
          className="animate-fadeIn font-bold lg:text-8xl text-5xl opacity-0 text-center"
        >
          Resume Builder.
        </h1>
        <p
          style={{ animationDelay: "0.3s" }}
          className="animate-fadeIn lg:text-2xl text-lg opacity-0 font-semibold text-center"
        >
          Let&apos;s generate and evaluate your resume
        </p>
      </div>

      <div className="flex lg:gap-[100px] gap-[50px] lg:flex-row flex-col font-semibold items-center justify-center relative bottom-[2.3rem] lg:mt-[4.4rem] mt-[0.8rem]">
        <Link
          href="/edit"
          style={{ animationDelay: "1.5s" }}
          className="relative z-10 animate-fadeIn h-[50px] flex items-center justify-center lg:w-[200px] w-[250px] opacity-0 text-xl font-semibold text-white hover:shadow-hover active:shadow-active font-mono bg-black overflow-hidden transition-all duration-300"
        >
          Create Resume
        </Link>

        <Link
          href="/analyze"
          style={{ animationDelay: "1.5s" }}
          className="relative z-10 animate-fadeIn flex items-center justify-center h-[50px] w-[150px] opacity-0 text-xl font-semibold text-black font-mono border-2 border-black bg-white overflow-hidden transition-all duration-300 hover:shadow-hover active:shadow-active"
        >
          Analyze
        </Link>
      </div>
    </main>
  );
}
