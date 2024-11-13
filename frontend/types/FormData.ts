interface Education {
  school: string;
  degree: string;
  startYear: string;
  endYear: string;
}

interface Experience {
  company: string;
  position: string;
  description?: string;
  keyAchievements?: string;
  startYear: string;
  endYear: string;
}

interface Socials {
  socialMedia: string;
  link: string;
}

interface Skills {
  title: string;
  skills?: string[];
}

interface Project {
  name: string;
  link: string;
  description?: string;
  keyAchievements?: string;
  startYear: string;
  endYear: string;
}

export interface ResumeForm {
  uuid?: string;
  name: string;
  position: string;
  number: string;
  email: string;
  address: string;
  profilePicture?: string;
  socialMedia: Socials[];
  summary: string;
  education: Education[];
  workExperience: Experience[];
  projects: Project[];
  skills: Skills[];
  certifications?: string[];
  languages?: string[];
}
