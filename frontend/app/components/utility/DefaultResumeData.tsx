import { ResumeForm } from "@/types/FormData";

const DefaultResumeData: ResumeForm = {
  name: "Rahul Marban",
  position: "Full-Stack, Open source developer | Undergrad Student at SRMIST",
  number: "+91 8248668008",
  email: "rahulmarban@gmail.com",
  address: "SRMIST, Kattankulathur",
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
  summary: `I am Rahul Marban, currently pursuing CSE with AIML at SRMIST. While I am passionate about AI, my true love lies in designing interfaces that combine aesthetic appeal with strong user experiences.

Taught myself to build everything from the visible parts of websites to the behind-the-scenes magic, making tech accessible and user-friendly`,
  education: [
    {
      school: "SRM Institute of Science and Technology",
      degree: "B.Tech CSE with AIML",
      startYear: "2023-08-20",
      endYear: "2027-05-01",
    },
    {
      school: "Sri Venkateshwara Matriculation Higher Secondary School",
      degree: "Secondary and High School",
      startYear: "2012-05-20",
      endYear: "2023-04-01",
    },
  ],
  workExperience: [
    {
      company: "Neugence Technology Pvt Ltd",
      position: "Frontend Developer",
      startYear: "2024-08-16",
      endYear: "Present",
    },
    {
      company: "Next Tech Lab",
      position: "Associate - Norman Lab",
      startYear: "2024-08-16",
      endYear: "Present",
    },
    {
      company: "Google Developer Student Clubs SRM",
      position: "Technical Member",
      startYear: "2024-04-22",
      endYear: "Present",
    },
    {
      company: "Microsoft Learn Student Ambassadors SRM",
      position: "Technical Associate",
      startYear: "2023-09-22",
      endYear: "2024-10-12",
    },
    {
      company: "Dreamnity",
      position: "Chief Technology Officer",
      startYear: "2023-05-22",
      endYear: "2024-06-12",
    },
  ],
  projects: [
    {
      name: "gitMyStat!",
      link: "https://gitmystat.vercel.app",
      description:
        "gitMyStat! is a helpful project that generates an image svg with your GitHub stats and activity in a sleek and modern way.",
      keyAchievements: "Used by over 100 users",
      startYear: "2024-06-12",
      endYear: "Present",
    },
    {
      name: "AcademiaPro",
      link: "https://academia-pro.vercel.app",
      description: "University data, beautifully presented at your fingertips.",
      keyAchievements: `Used by over 120k users per month
1.1 million page views
34 GitHub stars`,
      startYear: "2023-12-12",
      endYear: "Present",
    },
    {
      name: "simply-djs",
      link: "https://simplyd.js.org",
      description:
        'SimplyDJS is a "third party" module which uses Discord.JS to implement some of the complex systems in few-lines',
      keyAchievements: `Reached 400k+ downloads per year
Most trusted third-party module
Used on nearly 1 million discord bots`,
      startYear: "2021-06-12",
      endYear: "2023-12-12",
    },
  ],
  skills: [
    {
      title: "Technical Skills",
      skills: [
        "TypeScript",
        "React",
        "Node.js",
        "Next.js",
        "JavaScript",
        "Python",
        "Web Scraping",
        "C++",
        "HTML5",
        "CSS",
        "SQL",
        "User Interface",
        "Creativity",
      ],
    },
    {
      title: "Soft Skills",
      skills: [
        "Collaboration",
        "Problem-solving",
        "Communication",
        "Time management",
        "Result-oriented",
      ],
    },
    {
      title: "Additional Skills",
      skills: ["Writing", "Research", "Designing"],
    },
  ],
  languages: ["English", "Hindi", "Tamil"],
  certifications: [
    "Certified Web Professional-Web Developer",
    "Java Development Certified Professional",
  ],
};

export default DefaultResumeData;
