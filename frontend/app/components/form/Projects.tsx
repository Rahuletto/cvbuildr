import FormButton from "./FormButton";
import React, { useContext } from "react";
import { ResumeContext } from "@/providers/Resume";

const Projects = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  const handleProjects = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    const newProjects = [...resumeData.projects];
    (newProjects[index] as any)[e.target.name] = e.target.value;
    setResumeData({ ...resumeData, projects: newProjects });
  };

  const addProjects = () => {
    setResumeData({
      ...resumeData,
      projects: [
        ...resumeData.projects,
        {
          name: "",
          link: "",
          description: "",
          keyAchievements: "",
          startYear: "",
          endYear: "",
        },
      ],
    });
  };

  const removeProjects = () => {
    const newProjects = [...resumeData.projects];
    newProjects.pop();
    setResumeData({ ...resumeData, projects: newProjects });
  };

  return (
    <div className="flex relative flex-col gap-2 -m-3 px-6 py-4 pb-8 my-14 border-2 border-black border-dashed">
      <h2 className="input-title">Projects</h2>
      {resumeData &&
        resumeData.projects?.map((project, index) => (
          <div
            key={index}
            className={`f-col ${
              index < resumeData.projects.length - 1
                ? "border-b border-black border-dashed mb-6 pb-6"
                : ""
            }`}
          >
            <input
              type="text"
              placeholder="Project Name"
              name="name"
              className="w-full other-input"
              value={project.name}
              onChange={(e) => handleProjects(e, index)}
            />
            <input
              type="text"
              placeholder="Link"
              name="link"
              className="w-full other-input"
              value={project.link}
              onChange={(e) => handleProjects(e, index)}
            />
            <textarea
              placeholder="Description"
              name="description"
              className="w-full other-input h-32"
              value={project.description}
              maxLength={250}
              onChange={(e) => handleProjects(e, index)}
            />
            <textarea
              placeholder="Key Achievements"
              name="keyAchievements"
              className="w-full other-input h-40"
              value={project.keyAchievements}
              onChange={(e) => handleProjects(e, index)}
            />
            <div className="flex-wrap-gap-2">
              <input
                type="date"
                placeholder="Start Year"
                name="startYear"
                className="other-input"
                value={project.startYear}
                onChange={(e) => handleProjects(e, index)}
              />
              <input
                type="date"
                placeholder="End Year"
                name="endYear"
                className="other-input"
                value={project.endYear}
                onChange={(e) => handleProjects(e, index)}
              />
            </div>
          </div>
        ))}
      <FormButton
        size={resumeData && resumeData.projects?.length}
        add={addProjects}
        remove={removeProjects}
      />
    </div>
  );
};

export default Projects;
