import React from "react";
import HomeButton from "../components/Home";

const templates = [
  {
    name: "Default",
    image: "/preview/default.png",
    link: "/edit/default",
  },
  {
    name: "Modern",
    image: "/preview/modern.png",
    link: "/edit/modern",
  },
  {
    name: "Clean",
    image: "/preview/clean.png",
    link: "/edit/clean",
  }
];
export default function Selection() {
  return (
    <main className="h-screen w-screen md:p-24 p-8">
      <HomeButton />
      <div className="exclude-print mb-12 lg:mb-0">
        <h1 className="md:text-5xl text-2xl md:ml-0 ml-20 font-bold">
          Select a template
        </h1>
        <p className="lg:block hidden text-lg font-medium mb-8">
          Let&apos;s get started with your resume
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {templates.map((template) => (
          <a key={template.name} className="flex flex-col" href={template.link}>
            <img
              src={template.image}
              alt={template.name}
              className="w-full border-4 border-black rounded-xl object-cover"
            />
            <span className="block mt-2 font-semibold text-lg">
              {template.name}
            </span>
          </a>
        ))}
      </div>
    </main>
  );
}
