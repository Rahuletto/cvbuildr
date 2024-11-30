import React, { useContext } from "react";

import FormButton from "./FormButton";
import { ResumeContext } from "@/providers/Resume";

const Certification = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);
  const skillType = "certifications";
  const title = "Certifications";

  const handleSkills = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    skillType: string
  ) => {
    const newSkills = [...(resumeData as any)[skillType]];
    newSkills[index] = e.target.value;
    setResumeData({ ...resumeData, [skillType]: newSkills });
  };

  const addSkill = () => {
    setResumeData({
      ...resumeData,
      [skillType]: [...(resumeData[skillType] || []), ""],
    });
  };

  const removeSkill = () => {
    const newSkills = [...(resumeData[skillType] || [])];
    newSkills.splice(-1, 1);
    setResumeData({ ...resumeData, [skillType]: newSkills });
  };

  return (
    <div className="flex relative flex-col gap-2 -m-3 px-6 py-4 pb-8 my-14 border-2 border-black border-dashed">
      <h2 className="input-title">{title}</h2>
      {(resumeData[skillType] || []).map((skill, index) => (
        <div key={index} className="f-col">
          <input
            type="text"
            placeholder={title}
            name={title}
            className="w-full other-input"
            value={skill}
            onChange={(e) => handleSkills(e, index, skillType)}
          />
        </div>
      ))}
      <FormButton
        size={(resumeData[skillType] || []).length}
        add={addSkill}
        remove={removeSkill}
      />
    </div>
  );
};

export default Certification;
