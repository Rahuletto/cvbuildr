import { ATSResult } from "@/types/Analysis";
import { createClient } from "@supabase/supabase-js";
import { NextRequest } from "next/server";

interface ResumeForm {
  summary?: string;
  skills: { skills: string[] }[];
  workExperience: { position: string; company: string }[];
  projects: { name: string; description: string }[];
}

interface ClassificationResult {
  labels: string[];
  scores: number[];
}

const HUGGINGFACE_API_URL =
  "https://api-inference.huggingface.co/models/facebook/bart-large-mnli";
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";
const HF_API_KEY = process.env.HF_KEY;
const GEMINI_API_KEY = process.env.GOOGLE_API_KEY;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function classifySection(
  text: string
): Promise<{ strength: string; confidence: number }> {
  const response = await fetch(HUGGINGFACE_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${HF_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputs: text,
      parameters: { candidate_labels: ["strong", "moderate", "weak"] },
    }),
  });

  if (!response.ok) {
    throw new Error(`Error from Hugging Face API: ${response.statusText}`);
  }

  const result: ClassificationResult = await response.json();
  const strengthLabel = result.labels[0];
  const confidenceScore = result.scores[0];

  return {
    strength: strengthLabel,
    confidence: Math.round(confidenceScore * 100 * 100) / 100,
  };
}

async function analyzeKeywords(
  resume: string,
  jobDescription: string
): Promise<{ matched: number; total: number }> {
  // First, use HuggingFace model to analyze text similarity
  const response = await fetch(HUGGINGFACE_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${HF_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputs: `${resume} [SEP] ${jobDescription}`,
      parameters: {
        candidate_labels: ["high_match", "medium_match", "low_match"],
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Error from Hugging Face API: ${response.statusText}`);
  }

  const result: ClassificationResult = await response.json();
  const matchScore = result.scores[0]; // Score for highest matching label

  // Clean and extract keywords as backup
  const cleanText = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  const cleanJobDesc = cleanText(jobDescription);

  const commonWords = new Set([
    "and",
    "the",
    "or",
    "in",
    "at",
    "to",
    "for",
    "with",
    "a",
    "an",
    "of",
    "on",
    "by",
    "is",
    "are",
    "was",
    "were",
    "be",
    "been",
    "this",
    "that",
    "these",
    "those",
    "from",
  ]);
  const extractKeywords = (text: string): string[] => {
    return text
      .split(" ")
      .filter((word) => word.length > 2 && !commonWords.has(word))
      .map((word) => word.replace(/[^a-z]/g, ""))
      .filter((word) => word.length > 2);
  };

  const jobKeywords = Array.from(new Set(extractKeywords(cleanJobDesc)));
  const totalKeywords = jobKeywords.length;

  // Combine both approaches for final score
  const matchedKeywords = Math.round(totalKeywords * matchScore);

  return {
    matched: matchedKeywords,
    total: totalKeywords,
  };
}

function evaluateFormatting(resume: string): {
  issues: string[];
  score: number;
} {
  const issues: string[] = [];
  let score = 100;

  if (
    resume.includes("|") ||
    resume.includes("+---") ||
    /[-|=]{3,}/.test(resume)
  ) {
    issues.push(
      "Avoid using ASCII art, tables, or complex formatting in plain text."
    );
    score -= 10;
  }

  if (/[A-Z]{10,}/.test(resume)) {
    issues.push("Avoid using excessive capital letters.");
    score -= 10;
  }

  if (resume.includes("!!!") || resume.includes("???")) {
    issues.push("Remove excessive punctuation marks.");
    score -= 10;
  }

  if (/\s{3,}/.test(resume)) {
    issues.push("Remove excessive spacing between words.");
    score -= 10;
  }

  const requiredSections = ["summary", "skills", "experience", "projects"];
  requiredSections.forEach((section) => {
    if (!resume.toLowerCase().includes(section)) {
      issues.push(
        `Missing '${
          section.charAt(0).toUpperCase() + section.slice(1)
        }' section.`
      );
      score -= 10;
    }
  });

  if (resume.length < 500) {
    issues.push(
      "Resume is too short; include more details about your experience and skills."
    );
    score -= 10;
  } else if (resume.length > 2000) {
    issues.push("Resume is too long; condense your content.");
    score -= 10;
  }

  return { issues, score: Math.max(0, score) };
}

async function semanticAnalysis(
  resume: string,
  jobDescription: string
): Promise<{ semanticScore: number }> {
  const response = await fetch(HUGGINGFACE_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${HF_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputs: `${resume} [SEP] ${jobDescription}`,
      parameters: { candidate_labels: ["strong", "moderate", "weak"] },
    }),
  });

  if (!response.ok) {
    console.error(`Error from Hugging Face API: ${response.statusText}`);
    return { semanticScore: 0 };
  }

  const result = await response.json();
  const confidence = result.scores[0];

  return { semanticScore: Math.round(confidence * 100) };
}

async function generateSuggestions(
  resume: string,
  jobDescription: string,
  score: number
): Promise<string> {
  const prompt = `
    Analyze the following resume content in comparison to the job description and provide reasons why it got the score. Provide actionable suggestions for improving the resume:
    Resume: "${resume}"
    Job Description: "${jobDescription}"
    Score: "${score}"
    Do not mention my name or do anything, languages will be in skills, ill not give you ceritifications and education so dont include that, no need to be visually appealing. dont talk about that and just do what I asked. Just breakdown of the issues and actionable suggestions, also there are employment dates ok? its that i dont read it from the pdf. also ill be giving summary, work experience and projects separately so dont mind if its missing. just go straight to the content
    Also make sure to provide suggestions for each section of the resume. I would love if you give it as a JSON object with each section as a key and the suggestions as an array of strings. without any kind of markdown, just SIMPLE JSON OK?
    Like {overall: string; summary: string[]; skills: string[]; experience: string[]; projects: string[]; others: string[]} yes array of strings like making them points, without any markdown or anything. Just plain JSON without newlines`;

  const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.8, maxOutputTokens: 1024 },
    }),
  });

  if (!response.ok) {
    console.error(`Error generating suggestions: ${response.statusText}`);
    return "Unable to generate suggestions.";
  }

  const result = await response.json();
  const suggestions =
    result?.candidates?.[0]?.content?.parts?.[0]?.text ||
    "No suggestions available.";

  return suggestions
    .replaceAll("```json", "")
    .replace("```", "")
    .replaceAll("\n", ""); // Assuming $$ delimiter for splitting suggestions
}

// Function to infer job role from resume content
function inferJobRole(resume: ResumeForm): string {
  const content = `${resume.summary || ""} ${resume.skills
    .map((s) => s.skills.join(" "))
    .join(" ")} ${resume.workExperience
    .map((w) => w.position)
    .join(" ")}`.toLowerCase();

  if (
    content.includes("software") ||
    content.includes("developer") ||
    content.includes("programming")
  )
    return "software_developer";
  if (
    content.includes("data") ||
    content.includes("analyst") ||
    content.includes("science")
  )
    return "data_scientist";
  if (
    content.includes("design") ||
    content.includes("ui") ||
    content.includes("ux")
  )
    return "designer";
  return "general";
}

export async function POST(req: NextRequest) {
  try {
    const { summary, skills, workExperience, projects }: ResumeForm =
      await req.json();
    const auth = req.headers.get("Authorization");

    if (auth) {
      const { data } = await supabase
        .from("Resume")
        .select("subscribed")
        .eq("uuid", auth)
        .maybeSingle();

      const inferredRole = inferJobRole({
        summary,
        skills,
        workExperience,
        projects,
      });
      const jobDescription = getGenericJobDescription(inferredRole);

      const skillsText = skills
        .map((skill) => skill.skills.join(", "))
        .join(" ");
      const workExperienceText = workExperience
        .map((job) => `${job.position} at ${job.company}`)
        .join(" ");
      const projectsText = projects
        .map((project) => `${project.name}: ${project.description}`)
        .join(" ");
      const resumeContent = `${summary ? "summary: " + summary : ""} ${
        skillsText ? "skills: " + skillsText : ""
      } ${workExperienceText ? "experience: " + workExperienceText : ""} ${
        projectsText ? "projects: " + projectsText : ""
      }`;

      const { matched, total } = await analyzeKeywords(
        resumeContent,
        jobDescription
      );
      const keywordScore = total > 0 ? Math.round((matched / total) * 100) : 0;

      const summaryResult = summary
        ? await classifySection(summary)
        : { strength: "weak", confidence: 0 };

      const skillsResult = skillsText
        ? await classifySection(skillsText)
        : { strength: "weak", confidence: 0 };

      const experienceResult = workExperienceText
        ? await classifySection(workExperienceText)
        : { strength: "weak", confidence: 0 };

      const projectsResult = projectsText
        ? await classifySection(projectsText)
        : { strength: "weak", confidence: 0 };

      const confidences = [
        summaryResult.confidence,
        skillsResult.confidence,
        experienceResult.confidence,
        projectsResult.confidence,
      ];
      const overallConfidence =
        Math.round(
          (confidences.reduce((a, b) => a + b, 0) / confidences.length) * 100
        ) / 100;

      const { issues: formattingIssues, score: formattingScore } =
        evaluateFormatting(resumeContent);

      const { semanticScore } = await semanticAnalysis(
        resumeContent,
        jobDescription
      );

      const sectionScore =
        ((+resumeContent.includes("summary") +
          +resumeContent.includes("skills") +
          +resumeContent.includes("experience") +
          +resumeContent.includes("projects")) /
          4) *
        100;

      const overallScore = Math.round(
        keywordScore * 0.4 +
          semanticScore * 0.4 +
          formattingScore * 0.1 +
          sectionScore * 0.1
      );

      let suggestions, parsedSuggestions;

      if (data?.subscribed) {
        suggestions = await generateSuggestions(
          resumeContent,
          jobDescription,
          overallScore
        );

        try {
          parsedSuggestions = JSON.parse(suggestions);
        } catch {
          parsedSuggestions = suggestions;
        }
      }

      const result: ATSResult = {
        overallScore: {
          score: overallScore,
          confidence: overallConfidence,
        },
        summary: {
          grade: keywordScore > 80 ? "Success" : "Needs Improvement",
          score: Math.min(
            (keywordScore * 2 + summaryResult.confidence) / 2,
            100
          ),
          confidence: summaryResult.confidence,
        },
        skills: {
          score: skillsResult.confidence,
        },
        workExperience: {
          score: semanticScore,
          confidence: experienceResult.confidence,
          completeness: "Complete",
        },
        projects: {
          score: semanticScore,
          confidence: projectsResult.confidence,
        },
        formatting: {
          issues: formattingIssues,
          score: formattingScore,
        },
        keywordMatching: {
          matchScore: keywordScore,
        },
        semanticAnalysis: {
          score: semanticScore,
        },
        sectionCompleteness: {
          completenessScore: sectionScore,
        },
        suggestions: data?.subscribed ? parsedSuggestions : null,
      };

      return Response.json(result, {
        status: 200,
      });
    } else {
      const inferredRole = inferJobRole({
        summary,
        skills,
        workExperience,
        projects,
      });
      const jobDescription = getGenericJobDescription(inferredRole);

      const skillsText = skills
        .map((skill) => skill.skills.join(", "))
        .join(" ");
      const workExperienceText = workExperience
        .map((job) => `${job.position} at ${job.company}`)
        .join(" ");
      const projectsText = projects
        .map((project) => `${project.name}: ${project.description}`)
        .join(" ");
      const resumeContent = `${summary ? "summary: " + summary : ""} ${
        skillsText ? "skills: " + skillsText : ""
      } ${workExperienceText ? "experience: " + workExperienceText : ""} ${
        projectsText ? "projects: " + projectsText : ""
      }`;

      const { matched, total } = await analyzeKeywords(
        resumeContent,
        jobDescription
      );
      const keywordScore = total > 0 ? Math.round((matched / total) * 100) : 0;

      const summaryResult = summary
        ? await classifySection(summary)
        : { strength: "weak", confidence: 0 };

      const skillsResult = skillsText
        ? await classifySection(skillsText)
        : { strength: "weak", confidence: 0 };

      const experienceResult = workExperienceText
        ? await classifySection(workExperienceText)
        : { strength: "weak", confidence: 0 };

      const projectsResult = projectsText
        ? await classifySection(projectsText)
        : { strength: "weak", confidence: 0 };

      const confidences = [
        summaryResult.confidence,
        skillsResult.confidence,
        experienceResult.confidence,
        projectsResult.confidence,
      ];
      const overallConfidence =
        Math.round(
          (confidences.reduce((a, b) => a + b, 0) / confidences.length) * 100
        ) / 100;

      const { issues: formattingIssues, score: formattingScore } =
        evaluateFormatting(resumeContent);

      const { semanticScore } = await semanticAnalysis(
        resumeContent,
        jobDescription
      );

      const sectionScore =
        ((+resumeContent.includes("summary") +
          +resumeContent.includes("skills") +
          +resumeContent.includes("experience") +
          +resumeContent.includes("projects")) /
          4) *
        100;

      const overallScore = Math.round(
        keywordScore * 0.4 +
          semanticScore * 0.4 +
          formattingScore * 0.1 +
          sectionScore * 0.1
      );

      const result: ATSResult = {
        overallScore: {
          score: overallScore,
          confidence: overallConfidence,
        },
        summary: {
          grade: keywordScore > 80 ? "Success" : "Needs Improvement",
          score: Math.min(
            (keywordScore * 2 + summaryResult.confidence) / 2,
            100
          ),
          confidence: summaryResult.confidence,
        },
        skills: {
          score: skillsResult.confidence,
        },
        workExperience: {
          score: semanticScore,
          confidence: experienceResult.confidence,
          completeness: "Complete",
        },
        projects: {
          score: semanticScore,
          confidence: projectsResult.confidence,
        },
        formatting: {
          issues: formattingIssues,
          score: formattingScore,
        },
        keywordMatching: {
          matchScore: keywordScore,
        },
        semanticAnalysis: {
          score: semanticScore,
        },
        sectionCompleteness: {
          completenessScore: sectionScore,
        },
      };

      return Response.json(result, {
        status: 200,
      });
    }
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
function getGenericJobDescription(role: string): string {
  const descriptions = {
    software_developer: `We are seeking a skilled Software Developer to join our team. The ideal candidate should have strong programming skills, experience with modern development frameworks, and knowledge of software development best practices. Requirements include: proficiency in multiple programming languages, experience with version control systems, ability to write clean, maintainable code, and strong problem-solving skills.`,

    data_scientist: `Looking for a Data Scientist with strong analytical and programming skills. The ideal candidate should have experience with statistical analysis, machine learning, and data visualization. Requirements include: proficiency in Python/R, experience with ML frameworks, strong mathematics background, and ability to communicate complex findings clearly.`,

    designer: `Seeking a talented UI/UX Designer to create exceptional user experiences. The ideal candidate should have strong design skills and understanding of user-centered design principles. Requirements include: proficiency in design tools, experience with wireframing and prototyping, understanding of accessibility standards, and excellent visual design skills.`,

    general: `Seeking a professional with strong analytical and communication skills. The ideal candidate should have relevant experience in their field, ability to work in a team environment, and excellent problem-solving capabilities. Requirements include: strong organizational skills, attention to detail, and ability to meet deadlines.`,
  };

  return (
    descriptions[role as keyof typeof descriptions] || descriptions.general
  );
}
