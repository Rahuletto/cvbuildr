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
];
export default function Selection() {
  return (
    <main className="h-screen w-screen p-32">
      <HomeButton />
      <h1 className="text-7xl text-left font-bold">Select a template</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-8">
        {templates.map((template) => (
          <a key={template.name} href={template.link}>
            <img
              src={template.image}
              alt={template.name}
              className="w-full border-4 border-black object-cover"
            />
            <a
              href={template.link}
              className="block mt-4 font-semibold text-lg"
            >
              {template.name}
            </a>
          </a>
        ))}
      </div>
    </main>
  );
}
