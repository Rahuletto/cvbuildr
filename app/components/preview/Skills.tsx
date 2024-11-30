import React, { FocusEvent, useContext } from "react";
import { ResumeContext } from "@/providers/Resume";

const Skills = ({ title, skills }: { title: string; skills: string[] }) => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  const handleTitleChange = (e: FocusEvent<HTMLHeadingElement>) => {
    const newSkills = [...resumeData.skills];
    const skillType = newSkills.find((skillType) => skillType.title === title);
    if (skillType) {
      skillType.title = e.target.innerText;
    }
    setResumeData({ ...resumeData, skills: newSkills });
  };

  return (
    skills.length > 0 && (
      <>
        <h2
          className="section-title mb-1 border-b-2 border-gray-300 editable"
          contentEditable
          suppressContentEditableWarning
          onBlur={handleTitleChange}
        >
          {title}
        </h2>
        <p className="sub-content">{skills.join(", ")}</p>
      </>
    )
  );
};

export default Skills;
