import FormButton from "./FormButton";
import React, { useContext } from "react";
import { ResumeContext } from "@/providers/Resume";

const Education = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  const handleEducation = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newEducation = [...resumeData.education];
    (newEducation[index] as any)[e.target.name] = e.target.value;
    setResumeData({ ...resumeData, education: newEducation });
  };

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [
        ...resumeData.education,
        { school: "", degree: "", startYear: "", endYear: "" },
      ],
    });
  };

  const removeEducation = () => {
    const newEducation = [...resumeData.education];
    newEducation.pop();
    setResumeData({ ...resumeData, education: newEducation });
  };

  return (
    <div className="flex relative flex-col gap-2 -m-3 px-6 py-4 pb-8 my-14 border-2 border-black border-dashed">
      {resumeData.education && <h2 className="input-title">Education</h2>}
      {resumeData.education &&
        resumeData.education.map((education, index) => (
          <div
            key={index}
            className={`f-col ${
              index < resumeData.education.length - 1
                ? "border-b border-black border-dashed mb-6 pb-6"
                : ""
            }`}
          >
            <input
              type="text"
              placeholder="School"
              name="school"
              className="w-full other-input"
              value={education.school}
              onChange={(e) => handleEducation(e, index)}
            />
            <input
              type="text"
              placeholder="Degree"
              name="degree"
              className="w-full other-input"
              value={education.degree}
              onChange={(e) => handleEducation(e, index)}
            />
            <div className="flex-wrap-gap-2">
              <input
                type="date"
                placeholder="Start Year"
                name="startYear"
                className="other-input"
                value={education.startYear}
                onChange={(e) => handleEducation(e, index)}
              />
              <input
                type="date"
                placeholder="End Year"
                name="endYear"
                className="other-input"
                value={education.endYear}
                onChange={(e) => handleEducation(e, index)}
              />
            </div>
          </div>
        ))}
      <FormButton
        size={resumeData.education?.length}
        add={addEducation}
        remove={removeEducation}
      />
    </div>
  );
};

export default Education;
