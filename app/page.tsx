import Link from "next/link";
import Auth from "./components/Auth";
import Image from "next/image";

export default function Home() {
  return (
    <main className="w-screen min-h-screen overflow-hidden">
      <header className="py-6 px-14 flex justify-between items-center">
        <h1 className="font-semibold text-xl animate-fadeIn">cvbuildr</h1>
        <Auth />
      </header>

      <section className="flex relative pt-5 gap-3 opacity-0 animate-fadeIn xl:pt-0 justify-between xl:flex-row flex-col xl:items-end items-center lg:px-32 md:px-16 px-4 h-[80vh]">
        <div className="flex gap-5 flex-col h-full justify-center">
          <img style={{ animationDelay: "1.2s" }} src="/mascot.svg" className="relative lg:w-12 w-8 -mt-16 lg:-ml-8 -ml-4 -rotate-6 animate-fadeIn opacity-0" />
          <h2 style={{ animationDelay: "0.5s" }} className="text-4xl lg:-mt-4 -mt-6 xl:text-7xl font-bold animate-fadeIn opacity-0">Build your resume<br />in <span className="underline">no-time</span></h2>
          <p style={{ animationDelay: "1s" }} className="lg:text-lg text-base lg:mb-4 font-semibold opacity-0 animate-opacityFade">Build an ATS-compliant resume to showcase what<br />you&apos;ve done so far</p>
          <div className="flex gap-6 font-semibold items-center">
            <Link
              href="/edit"
              style={{ animationDelay: "1.5s" }}
              className="z-10 animate-fadeIn flex items-center justify-center px-6 py-2 rounded-xl opacity-0 lg:text-xl text-base font-semibold text-white hover:shadow-hover active:shadow-active bg-black overflow-hidden transition-all duration-300"
            >
              Build
            </Link>

            <Link
              href="/analyse"
              style={{ animationDelay: "1.5s" }}
              className="z-10 animate-fadeIn flex items-center justify-center opacity-0 lg:text-xl text-base px-4 py-2 rounded-xl font-semibold text-black border-2 border-black bg-white overflow-hidden transition-all duration-300 hover:shadow-hover active:shadow-active"
            >
              Analyse
            </Link>
          </div>
        </div>
        <div className="xl:relative xl:w-[50%] w-full h-full flex items-end xl:mb-10 justify-center xl:scale-110">
          <div style={{ animationDelay: "0.8s" }} className="z-50 absolute bottom-[-20px] right-[-100px] animate-cursor">
            <img src="/cursor.svg" className="flex flex-col" />
            <span className="px-2 py-0.5 text-sm font-semibold bg-black ml-6 relative -top-2 -rotate-3 flex text-white rounded-md">Marban</span>
          </div>
          <Image style={{ animationDelay: "0.8s" }} alt="Resume" src="/resume.png" className="xl:absolute bottom-0 animate-fadeIn opacity-0 xl:scale-125 origin-bottom border-r-8 border-black rounded-t-[32px] border" width={500} height={600} />
        </div>
      </section>
      <div className="flex h-[50px] bg-black w-[102%] rotate-[-3deg] ml-[-6px] -mt-3 lg:mt-0" />
      <span style={{ animationDelay: "3s" }} className="absolute animate-fadeIn opacity-0 md:bottom-6 bottom-2 right-12 text-black font-semibold text-md ">Made by <Link className="" href="https://marban.is-a.dev">Marban.</Link></span>
    </main>
  );
}
