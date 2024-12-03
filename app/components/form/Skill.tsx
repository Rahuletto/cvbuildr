import React, { ChangeEvent, FC, useContext } from "react";
import { ResumeContext } from "@/providers/Resume";
import FormButton from "./FormButton";

interface SkillProps {
  title: string;
}

const Skill: FC<SkillProps> = ({ title }) => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  // skills
  const handleSkill = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
    title: string
  ) => {
    const skillType = resumeData.skills.find(
      (skillType) => skillType.title === title
    );
    if (!skillType) return;
    const newSkills = [...(skillType?.skills ?? [])];
    newSkills[index] = e.target.value;
    setResumeData((prevData) => ({
      ...prevData,
      skills: prevData.skills.map((skill) =>
        skill.title === title ? { ...skill, skills: newSkills } : skill
      ),
    }));
  };

  const addSkill = (title: string) => {
    setResumeData((prevData) => {
      const skillType = prevData.skills.find(
        (skillType) => skillType.title === title
      );
      const newSkills = [...(skillType?.skills ?? [""]), ""];
      const updatedSkills = prevData.skills.map((skill) =>
        skill.title === title ? { ...skill, skills: newSkills } : skill
      );
      return {
        ...prevData,
        skills: updatedSkills,
      };
    });
  };

  const removeSkill = (title: string) => {
    setResumeData((prevData) => {
      const skillType = prevData.skills.find(
        (skillType) => skillType.title === title
      );
      if (!skillType) return prevData;
      const newSkills = [...(skillType?.skills ?? [])];
      newSkills.pop();
      const updatedSkills = prevData.skills.map((skill) =>
        skill.title === title ? { ...skill, skills: newSkills } : skill
      );
      return {
        ...prevData,
        skills: updatedSkills,
      };
    });
  };

  const skillType = resumeData.skills.find(
    (skillType) => skillType.title === title
  );

  return (
    <div className="flex relative flex-col gap-2 mb-8 pb-16 border-b-2 border-black border-dashed">
      <h2 className="input-title">{title}</h2>
      {skillType?.skills &&
        skillType?.skills?.map((skill, index) => (
          <div key={index} className="f-col">
            <input
              type="text"
              placeholder={title}
              name={title}
              className="w-full other-input"
              value={skill}
              onChange={(e) => handleSkill(e, index, title)}
            />
          </div>
        ))}
      <FormButton
        size={skillType?.skills?.length ?? 0}
        add={() => addSkill(title)}
        remove={() => removeSkill(title)}
      />
    </div>
  );
};

export default Skill;
