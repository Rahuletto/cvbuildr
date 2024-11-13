import { ResumeForm } from "@/types/FormData";

const DefaultResumeData: ResumeForm = {
  name: "",
  position: "Student",
  number: "",
  email: "@gmail.com",
  address: "SRMIST, Kattankulathur",
  profilePicture: "",
  socialMedia: [
    {
      socialMedia: "github",
      link: "https://github.com",
    },
    {
      socialMedia: "website",
      link: "https://",
    },
  ],
  summary: ``,
  education: [
    {
      school: "SRM Institute of Science and Technology",
      degree: "",
      startYear: "",
      endYear: "",
    },
  ],
  workExperience: [
    {
      company: "",
      position: "",
      startYear: "",
      endYear: "",
    },
  ],
  projects: [
    {
      name: "Resumator",
      link: "https://localhost:3000",
      description:
        "Resumator generates resume and analyzes using One-Shot classification and generates ATS validated resume",
      keyAchievements: "",
      startYear: "2024-10-10",
      endYear: "Present",
    },
  ],
  skills: [
    {
      title: "Technical Skills",
      skills: [""],
    },
    {
      title: "Soft Skills",
      skills: [""],
    },
    {
      title: "Additional Skills",
      skills: [""],
    },
  ],
  languages: ["English", "Hindi", "Tamil"],
  certifications: [""],
};

export default DefaultResumeData;
