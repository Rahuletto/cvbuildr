"use client";
import React, { ChangeEvent, useState } from "react";
import Language from "../components/form/Language";

import DefaultPreview from "../components/preview/modes/Default";
import SocialMedia from "../components/form/SocialMedia";
import WorkExperience from "../components/form/WorkExperience";
import Skill from "../components/form/Skill";
import PersonalInformation from "../components/form/PersonalInformation";
import Summary from "../components/form/Summary";
import Projects from "../components/form/Projects";
import Education from "../components/form/Education";
import Certification from "../components/form/Certification";

import { ResumeForm } from "@/types/FormData";
import { ResumeContext } from "@/providers/Resume";
import HomeButton from "../components/Home";
import ModernPreview from "../components/preview/modes/Modern";

export default function Editor({ json, type }: { json: ResumeForm ; type: "default" | "modern" }) {
  const [resumeData, setResumeData] = useState<ResumeForm>(json);

  const handleProfilePicture = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file instanceof Blob) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setResumeData({
          ...resumeData,
          profilePicture: event.target?.result as string,
        });
      };
      reader.readAsDataURL(file);
    } else {
      console.error("Invalid file type");
    }
  };

  const handleChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setResumeData({ ...resumeData, [target.name]: target.value });
  };

  return (
    <>
      <HomeButton />
      <ResumeContext.Provider
        value={{
          resumeData,
          setResumeData,
          handleProfilePicture,
          handleChange,
        }}
      >
        <div className="f-col gap-4 lg:flex-row justify-evenly w-screen lg:pr-0 px-4 lg:mx-auto lg:min-h-screen h-fit">
          <div className="exclude-print lg:mt-24 mt-8 lg:w-[38%]">
            <div className="exclude-print mb-12 lg:mb-0">
              <h1 className="lg:text-5xl text-2xl lg:ml-0 ml-20 font-bold">Build your resume</h1>
              <p className="lg:block hidden text-lg font-medium mb-8">
                Let&apos;s get started with your resume
              </p>
            </div>
            <form className="p-4 flex flex-col">
              <PersonalInformation />
              <Summary />
              <SocialMedia />
              <Education />
              <WorkExperience />
              <Projects />
              <div className="flex relative flex-col gap-2 -m-3 px-6 py-4 pb-8 my-14 border-2 border-black border-dashed">
                {resumeData.skills?.map((skill, index) => (
                  <Skill title={skill.title} key={index} />
                ))}
              </div>
              <Language />
              <Certification />
            </form>
          </div>
          {type=="modern" ? <ModernPreview /> : <DefaultPreview />}
        </div>
      </ResumeContext.Provider>
    </>
  );
}
