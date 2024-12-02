import React, { FocusEvent, useContext } from "react";
import { ResumeContext } from "@/providers/Resume";

const Skills = ({ title, skills, hclass, ptype }: { title: string; skills: string[]; hclass?: string; ptype?: "list" | "default" }) => {
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
          className={hclass + " section-title mb-1 border-b-2 border-gray-300 editable"}
          contentEditable
          suppressContentEditableWarning
          onBlur={handleTitleChange}
        >
          {title}
        </h2>
        {ptype == "list" ?
          <ul className={skills.length > 7 ? "grid grid-cols-2" : "ml-3"}>
            {skills.map((skill, index) => (
              <li key={index} className="sub-content list-disc">{skill}</li>
            ))}
          </ul>
          : <p className="sub-content">{skills.join(", ")}</p>}
      </>
    )
  );
};

export default Skills;
