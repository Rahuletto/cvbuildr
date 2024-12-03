import React, { ChangeEvent, useContext } from "react";
import { ResumeContext } from "@/providers/Resume"
import FormButton from "./FormButton";

const Language = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);
  const skillType = "languages";
  const title = "Languages";
  const placeholder = "Language";

  const handleSkills = (e: ChangeEvent<HTMLInputElement>, index: number, skillType: string) => {
    const newSkills = [...(resumeData as any)[skillType]];
    newSkills[index] = e.target.value;
    setResumeData({ ...resumeData, [skillType]: newSkills });
  };

  const addSkill = () => {
    setResumeData({ ...resumeData, [skillType]: [...(resumeData[skillType] || []), ""] });
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
            placeholder={placeholder}
            name="skill"
            className="w-full other-input"
            value={skill}
            onChange={(e) => handleSkills(e, index, skillType)}
          />
        </div>
      ))}
      <FormButton size={(resumeData[skillType] || []).length} add={addSkill} remove={removeSkill} />
    </div>
  );
};

export default Language;