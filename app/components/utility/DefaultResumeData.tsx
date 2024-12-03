import { ResumeForm } from "@/types/FormData";

const DefaultResumeData: ResumeForm = {
  name: "Name",
  position: "Developer",
  number: "+91",
  email: "email@xyz.com",
  address: "India",
  profilePicture: "",
  socialMedia: [
    {
      socialMedia: "github",
      link: "",
    },
    {
      socialMedia: "website",
      link: "",
    },
  ],
  summary: `I am a developer`,
  education: [
    {
      school: "ABC School",
      degree: "High school",
      startYear: "2008-08-20",
      endYear: "2020-05-01",
    },
  ],
  workExperience: [
    {
      company: "ABC Company",
      position: "Developer",
      startYear: "2022-08-16",
      endYear: "Present",
    },
  ],
  projects: [
    {
      name: "cvbuildr",
      link: "https://cvbuildr.vercel.app",
      description:
        "cvbuildr is a resume builder that helps you create a professional resume in no time, while also analysing your resume to help you improve it.",
      keyAchievements: "A resume builder",
      startYear: "2024-12-02",
      endYear: "Present",
    },
  ],
  skills: [
    {
      title: "Technical Skills",
      skills: [
        "Tech"
      ],
    },
    {
      title: "Soft Skills",
      skills: [
        "Collaboration",
      ],
    },
    {
      title: "Additional Skills",
      skills: ["Writing"],
    },
  ],
  languages: ["English"],
  certifications: [
    "Developer certificate",
  ],
};

export default DefaultResumeData;
