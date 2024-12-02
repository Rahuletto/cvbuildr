/* eslint-disable react/jsx-no-undef */
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import Skills from "../Skills";
import DateRange from "../../utility/DateRange";
import ContactInfo from "../ContactInfo";
import Image from "next/image";
import Link from "next/link";
import React, { ReactNode, useContext } from "react";
import { ResumeContext } from "@/providers/Resume";
import Language from "../Language";
import Certification from "../Certification";
import { FaLink } from "react-icons/fa6";
import { DropResult } from "react-beautiful-dnd";
import { HiOutlineDownload } from "react-icons/hi";
import { ATSResult } from "@/types/Analysis";
import Dialog from "../Dialog";
import { TbLoader2 } from "react-icons/tb";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const CleanPreview = () => {
  const icons = [
    { name: "github", icon: <FaGithub /> },
    { name: "linkedin", icon: <FaLinkedin /> },
    { name: "twitter", icon: <FaTwitter /> },
    { name: "facebook", icon: <FaFacebook /> },
    { name: "instagram", icon: <FaInstagram /> },
    { name: "youtube", icon: <FaYoutube /> },
    { name: "website", icon: <FaLink /> },
  ];

  const urls = [
    { name: "github", url: "https://github.com/" },
    { name: "linkedin", url: "https://linkedin.com/in/" },
    { name: "twitter", url: "https://twitter.com/" },
    { name: "facebook", url: "https://facebook.com/" },
    { name: "instagram", url: "https://instagram.com/" },
    { name: "youtube", url: "https://youtube.com/" },
    { name: "website", url: "https://" },
  ];

  const { resumeData, setResumeData } = useContext(ResumeContext);
  const [color, setColor] = React.useState("#86efac");
  const [loading, setLoading] = React.useState(false);
  const [saving, setSaving] = React.useState(0);
  const [analysis, setAnalysis] = React.useState<ATSResult | null>(null);

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (source.droppableId === "work-experience") {
      const newWorkExperience = [...resumeData.workExperience];
      const [removed] = newWorkExperience.splice(source.index, 1);
      newWorkExperience.splice(destination.index, 0, removed);
      setResumeData({ ...resumeData, workExperience: newWorkExperience });
    }

    if (source.droppableId.includes("WORK_EXPERIENCE_KEY_ACHIEVEMENT")) {
      const newWorkExperience = [...resumeData.workExperience];
      const workExperienceIndex = parseInt(source.droppableId.split("-")[1]);
      const keyAchievements = (
        newWorkExperience[workExperienceIndex] as any
      )?.keyAchievements.split("\n");
      const [removed] = keyAchievements.splice(source.index, 1);
      keyAchievements.splice(destination.index, 0, removed);
      newWorkExperience[workExperienceIndex].keyAchievements =
        keyAchievements.join("\n");
      setResumeData({ ...resumeData, workExperience: newWorkExperience });
    }

    if (source.droppableId === "skills") {
      const newSkills = [...resumeData.skills];
      const [removed] = newSkills.splice(source.index, 1);
      newSkills.splice(destination.index, 0, removed);
      setResumeData({ ...resumeData, skills: newSkills });
    }

    if (source.droppableId.includes("projects")) {
      const newProjects = [...resumeData.projects];
      const [removed] = newProjects.splice(source.index, 1);
      newProjects.splice(destination.index, 0, removed);
      setResumeData({ ...resumeData, projects: newProjects });
    }

    if (source.droppableId.includes("PROJECTS_KEY_ACHIEVEMENT")) {
      const newProjects = [...resumeData.projects];
      const projectIndex = parseInt(source.droppableId.split("-")[1]);
      const keyAchievements = (
        newProjects[projectIndex].keyAchievements as any
      )?.split("\n");
      const [removed] = keyAchievements.splice(source.index, 1);
      keyAchievements.splice(destination.index, 0, removed);
      newProjects[projectIndex].keyAchievements = keyAchievements.join("\n");
      setResumeData({ ...resumeData, projects: newProjects });
    }
  };

  function save() {
    setSaving(1);

    fetch("/api/save?uuid=" + resumeData.uuid, {
      method: "PATCH",
      body: JSON.stringify(resumeData),
    })
      .then((a) => a.json())
      .then((res) => {
        if (res.name) setSaving(2);
        else setSaving(3);

        setTimeout(() => {
          setSaving(0);
        }, 3000);
      });
  }

  function analyser() {
    save();
    setLoading(true);
    fetch("/api/analyse", {
      method: "POST",
      body: JSON.stringify(resumeData),
    })
      .then((a) => a.json())
      .then((res) => {
        setLoading(false);
        setAnalysis(res);
      });
  }

  return (
    <>
      {analysis && (
        <Dialog
          isOpen={!!analysis}
          onClose={() => setAnalysis(null)}
          analysis={analysis}
        />
      )}
      <label htmlFor="bgColorPicker" className="font-semibold hidden">
        Background Color:
      </label>

      {loading && (
        <div
          className={`exclude-print print:hidden z-50 fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center transition-all duration-300 ease-in-out
              opacity-100`}
        >
          <div
            className={`bg-white flex flex-row items-center justify-center w-[500px] gap-4 rounded-xl animate-shapeShift border-[3px] border-black shadow-[4px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden transition-all duration-300 ease-out
          scale-100 translate-y-0`}
            onClick={(e) => e.stopPropagation()}
          >
            <TbLoader2 className="animate-spin text-4xl" />
            <h1 className="text-3xl font-bold my-6  w-fit font-mono text-center">
              Analysing
            </h1>
          </div>
        </div>
      )}

      <div className="print:hidden exclude-print z-20 fixed bottom-10 right-10 h-auto flex gap-2 items-center justify-end">
        <input
          type="color"
          id="bgColorPicker"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-10 h-10 p-0 border-none invisible opacity-0"
        />
        <button
          onClick={() => save()}
          disabled={saving !== 0}
          className={`rounded-xl px-6 py-2 disabled:opacity-70 disabled:border-dashed border-2 border-black bg-black active:shadow-active transition-all duration-300 hover:shadow-hover disabled:hover:shadow-none disabled:active:shadow-none font-semibold ${
            saving === 2
              ? "bg-green-500 text-black"
              : saving === 3
              ? "bg-red-500 text-black"
              : "bg-black text-white"
          }`}
        >
          {saving === 1
            ? "Saving"
            : saving === 2
            ? "Saved"
            : saving === 3
            ? "Error"
            : "Save"}
        </button>

        <div
          style={{ backgroundColor: color }}
          onClick={() => {
            document.querySelector<HTMLInputElement>("#bgColorPicker")?.click();
          }}
          className=" w-10 h-10 shadow-active rounded-xl border-2 border-black"
        ></div>

        <button
          aria-label="Download Resume"
          className="font-bold bg-white flex items-center justify-center text-black shadow-lg border-2 p-2 rounded-xl border-black"
          onClick={() => analyser()}
        >
          <HiOutlineDownload className="text-3xl" title="Download Resume" />
        </button>
      </div>

      <div className="md:max-w-[50%] w-full h-fit min-h-screen sticky top-0 preview rm-padding-print bg-white border-l border-black print:border-l-0 print:absolute print:top-0 print:left-0 print:w-screen print:min-h-screen">
        <A4PageWrapper>
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-5 gap-6">
              <div className="col-span-3 space-y-2 p-6 print:p-6">
                <div className="f-col items-start mb-1">
                  {resumeData.profilePicture ? (
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-black">
                      <Image
                        src={resumeData.profilePicture}
                        alt="profile"
                        width={100}
                        height={100}
                        className="object-cover h-full w-full"
                      />
                    </div>
                  ) : (
                    <div className="mb-2" />
                  )}
                  <div className="flex flex-col gap-1 items-start justify-start">
                    <h1 className="name !text-2xl">{resumeData.name}</h1>
                    <p className="profession mb-3 !text-sm">
                      {resumeData.position}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3 items-start justify-start">
                    {resumeData.socialMedia &&
                      resumeData.socialMedia.map((socialMedia, index) => {
                        const url =
                          urls.find(
                            (a) =>
                              a.name === socialMedia.socialMedia.toLowerCase()
                          )?.url || urls[6].url;
                        return (
                          <Link
                            href={
                              socialMedia.link.startsWith("http")
                                ? socialMedia.link
                                : url
                                ? url + `${socialMedia.link}`
                                : "https://" + socialMedia.link
                            }
                            aria-label={socialMedia.socialMedia}
                            key={index}
                            title={socialMedia.socialMedia}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 social-media align-start justify-start w-fit"
                          >
                            {icons.find(
                              (a) =>
                                a.name === socialMedia.socialMedia.toLowerCase()
                            )?.icon || icons[6].icon}
                            {socialMedia.link}
                          </Link>
                        );
                      })}
                  </div>
                </div>
                <hr className="border-dashed my-2" />
                {resumeData.workExperience &&
                  resumeData.workExperience.length > 0 && (
                    <Droppable
                      droppableId="work-experience"
                      type="WORK_EXPERIENCE"
                    >
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          <h2
                            className="section-title mt-12 mb-1 border-b-2 border-gray-300 editable"
                            contentEditable
                            suppressContentEditableWarning
                          >
                            Work Experience
                          </h2>
                          {resumeData.workExperience &&
                            resumeData.workExperience.map((item, index) => (
                              <Draggable
                                key={`${item.company}-${index}`}
                                draggableId={`WORK_EXPERIENCE-${index}`}
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`mb-1 ${
                                      snapshot.isDragging &&
                                      "outline-dashed outline-2 outline-gray-400 bg-white"
                                    }`}
                                  >
                                    <div className="flex flex-row justify-between space-y-1">
                                      <p className="content i-bold">
                                        {item.position}
                                      </p>
                                      <DateRange
                                        startYear={item.startYear}
                                        endYear={item.endYear}
                                        id={`work-experience-start-end-date`}
                                      />
                                    </div>
                                    <p className="content ">{item.company}</p>
                                    <p className="content hyphens-auto">
                                      {item.description}
                                    </p>
                                    <Droppable
                                      droppableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}`}
                                      type="WORK_EXPERIENCE_KEY_ACHIEVEMENT"
                                    >
                                      {(provided) => (
                                        <ul
                                          className="list-disc ul-padding content"
                                          {...provided.droppableProps}
                                          ref={provided.innerRef}
                                        >
                                          {typeof item.keyAchievements ===
                                            "string" &&
                                            item.keyAchievements
                                              .split("\n")
                                              .map((achievement, subIndex) => (
                                                <Draggable
                                                  key={`${item.company}-${index}-${subIndex}`}
                                                  draggableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}-${subIndex}`}
                                                  index={subIndex}
                                                >
                                                  {(provided, snapshot) => (
                                                    <li
                                                      ref={provided.innerRef}
                                                      {...provided.draggableProps}
                                                      {...provided.dragHandleProps}
                                                      className={`
                                            hover:outline-dashed hover:outline-2 hover:outline-gray-400
                                            ${
                                              snapshot.isDragging &&
                                              "outline-dashed outline-2 outline-gray-400 bg-white"
                                            }`}
                                                    >
                                                      <div
                                                        dangerouslySetInnerHTML={{
                                                          __html: achievement,
                                                        }}
                                                        contentEditable
                                                      />
                                                    </li>
                                                  )}
                                                </Draggable>
                                              ))}
                                          {provided.placeholder}
                                        </ul>
                                      )}
                                    </Droppable>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  )}
                {resumeData.projects && resumeData.projects.length > 0 && (
                  <Droppable droppableId="projects" type="PROJECTS">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        <h2
                          className="section-title mb-1 mt-8 border-b-2 border-gray-300 editable"
                          contentEditable
                          suppressContentEditableWarning
                        >
                          Projects
                        </h2>
                        {resumeData.projects.map((item, index) => (
                          <Draggable
                            key={`${item.name}-${index}`}
                            draggableId={`PROJECTS-${index}`}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`mb-1 ${
                                  snapshot.isDragging &&
                                  "outline-dashed outline-2 outline-gray-400 bg-white"
                                }`}
                              >
                                <div className="flex flex-row justify-between space-y-1">
                                  <Link
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="content i-bold underline text-blue-600"
                                  >
                                    {item.name}
                                  </Link>
                                  <DateRange
                                    startYear={item.startYear}
                                    endYear={item.endYear}
                                    id={`work-experience-start-end-date`}
                                  />
                                </div>
                                <p className="content">{item.description}</p>
                                <Droppable
                                  droppableId={`PROJECTS_KEY_ACHIEVEMENT-${index}`}
                                  type="PROJECTS_KEY_ACHIEVEMENT"
                                >
                                  {(provided) => (
                                    <ul
                                      className="list-disc ul-padding content"
                                      {...provided.droppableProps}
                                      ref={provided.innerRef}
                                    >
                                      {typeof item.keyAchievements ===
                                        "string" &&
                                        item.keyAchievements
                                          .split("\n")
                                          .map((achievement, subIndex) => (
                                            <Draggable
                                              key={`${item.name}-${index}-${subIndex}`}
                                              draggableId={`PROJECTS_KEY_ACHIEVEMENT-${index}-${subIndex}`}
                                              index={subIndex}
                                            >
                                              {(provided, snapshot) => (
                                                <li
                                                  ref={provided.innerRef}
                                                  {...provided.draggableProps}
                                                  {...provided.dragHandleProps}
                                                  className={`
                                            hover:outline-dashed hover:outline-2 hover:outline-gray-400
                                            ${
                                              snapshot.isDragging &&
                                              "outline-dashed outline-2 outline-gray-400 bg-white"
                                            }`}
                                                >
                                                  <div
                                                    dangerouslySetInnerHTML={{
                                                      __html: achievement,
                                                    }}
                                                    contentEditable
                                                  />
                                                </li>
                                              )}
                                            </Draggable>
                                          ))}
                                      {provided.placeholder}
                                    </ul>
                                  )}
                                </Droppable>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                )}

                <Language
                  title="Languages"
                  hclass="mt-8"
                  languages={resumeData.languages ?? []}
                />
              </div>

              <div
                style={{
                  backgroundColor: color,
                }}
                className={`col-span-2 space-y-2 border-l-2 border-black/10 gap-4 flex flex-col p-6 print:p-6 h-screen print:h-full`}
              >
                <ContactInfo
                  mainclass="flex flex-col gap-3 mb-10 contact"
                  linkclass="inline-flex items-center gap-1"
                  teldata={resumeData.number}
                  emaildata={resumeData.email}
                  addressdata={resumeData.address}
                  telicon={<MdPhone />}
                  emailicon={<MdEmail />}
                  addressicon={<MdLocationOn />}
                />

                {resumeData.summary.length > 0 && (
                  <div className="mb-1">
                    <h2 className="section-title mb-1 border-b-2 border-gray-800">
                      Summary
                    </h2>
                    <p className="content break-words">{resumeData.summary}</p>
                  </div>
                )}
                <div>
                  {resumeData.education && resumeData.education.length > 0 && (
                    <div className="mb-1">
                      <h2 className="section-title mb-1 border-b-2 border-gray-800">
                        Education
                      </h2>
                      {resumeData.education &&
                        resumeData.education.map((item, index) => (
                          <div key={index} className="mb-1">
                            <p className="content i-bold">{item.degree}</p>
                            <p className="content">{item.school}</p>
                            <DateRange
                              startYear={item.startYear}
                              endYear={item.endYear}
                              id={`education-start-end-date`}
                            />
                          </div>
                        ))}
                    </div>
                  )}
                </div>
                <Droppable droppableId="skills" type="SKILLS">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {resumeData.skills?.map((skill, index) => (
                        <Draggable
                          key={`SKILLS-${index}`}
                          draggableId={`SKILLS-${index}`}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`mb-1 ${
                                snapshot.isDragging &&
                                "outline-dashed outline-2 outline-gray-800 bg-white"
                              }`}
                            >
                              <Skills
                                title={skill.title}
                                hclass="section-title mb-1 border-b-2 !border-gray-800"
                                skills={skill.skills ?? []}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>

                <Certification
                  title="Certifications"
                  hclass="section-title mb-1 border-b-2 !border-gray-800"
                  certifications={resumeData.certifications ?? []}
                />
              </div>
            </div>
          </DragDropContext>
        </A4PageWrapper>
      </div>
    </>
  );
};

const A4PageWrapper = ({ children }: { children: ReactNode }) => {
  return <div className="w-8.5in">{children}</div>;
};

export default CleanPreview;
