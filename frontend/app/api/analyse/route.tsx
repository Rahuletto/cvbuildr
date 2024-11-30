import { NextRequest, NextResponse } from "next/server";

const HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-mnli";
const SUGGESTION_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";
const API_KEY = process.env.GOOGLE_API_KEY
const HUGGINGFACE_API_KEY = process.env.HF_KEY;

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

async function classifySection(
    text: string,
    labels: string[]
): Promise<{ strength: string; confidence: number }> {
    const response = await fetch(HUGGINGFACE_API_URL, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            inputs: text,
            parameters: { candidate_labels: labels },
        }),
    });

    if (!response.ok) {
        throw new Error(`Error from Hugging Face API: ${response.statusText}`);
    }

    const result: ClassificationResult = await response.json();
    const strengthLabel = result.labels[0];
    const confidenceScore = result.scores[0];

    return { strength: strengthLabel, confidence: Math.round(confidenceScore * 100 * 100) / 100 };
}

async function generateSuggestions(
    section: string,
    content: string,
    strength: string,
    confidence: number
): Promise<string> {
    const prompt = `
    Analyze the following resume section titled "${section}". The content is:
    "${content}"
  
    This section was classified as "${strength}" with a confidence of ${confidence}%.
    Please explain why it received this score and provide actionable, detailed suggestions to improve it.
    There are dates of employment, its just cut off ok? dont mention that and be straight forward as possible
    Be short and informative
    Just be very short about the suggestion, just give bland simple straight forward answer, dont yap about it. Short as possible, Only critical and severe ones only, dont make it redundant. You can use html instead of raw markdown. Only suggestions to improve, dont yap why its high and all. if its low tell things that can improve it, stop yapping
    Dont give bullet points, split then with $$ characters so i can split and format it by myself ok? no bullet points or headings, just give what needed to improve. Do not use markdown syntax anywhere, its alllll plain text got it? Dont cut off ok? complete fully. also end it with $$ to let me know u completed it 
    `;

    const response = await fetch(`${SUGGESTION_API_URL}?key=${API_KEY}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            contents: [
                {
                    parts: [{ text: prompt }],
                },
            ],
            "generationConfig": {
                temperature: 0.8,
                maxOutputTokens: 96
            }
        }),
    });

    if (!response.ok) {
        console.error(`Error generating suggestions: ${response.statusText}`)
        throw new Error(`Error generating suggestions: ${response.statusText}`);
    }

    const result = await response.json();
    return result?.candidates?.[0]?.content?.parts?.[0]?.text || "No suggestions available.";
}

export async function POST(req: NextRequest) {
    try {
        const resumeData: ResumeForm = await req.json();

        const summary = resumeData.summary || "";
        const skillsText = resumeData.skills.map((skill) => skill.skills.join(", ")).join(" ");
        const workExperienceText = resumeData.workExperience
            .map((job) => `${job.position} at ${job.company}`)
            .join(" ");
        const projectsText = resumeData.projects
            .map((project) => `${project.name}: ${project.description}`)
            .join(" ");

        const summaryResult = summary
            ? await classifySection(summary, ["strong", "moderate", "weak"])
            : { strength: "weak", confidence: 0 };

        const skillsResult = skillsText
            ? await classifySection(skillsText, ["strong", "moderate", "weak"])
            : { strength: "weak", confidence: 0 };

        const experienceResult = workExperienceText
            ? await classifySection(workExperienceText, ["strong", "moderate", "weak"])
            : { strength: "weak", confidence: 0 };

        const projectsResult = projectsText
            ? await classifySection(projectsText, ["strong", "moderate", "weak"])
            : { strength: "weak", confidence: 0 };

        // Generate suggestions dynamically using AI
        const summarySuggestion = summary
            ? await generateSuggestions("Summary", summary, summaryResult.strength, summaryResult.confidence)
            : "No content provided to analyze.";
        const skillsSuggestion = skillsText
            ? await generateSuggestions("Skills", skillsText, skillsResult.strength, skillsResult.confidence)
            : "No content provided to analyze.";
        const experienceSuggestion = workExperienceText
            ? await generateSuggestions("Work Experience", workExperienceText, experienceResult.strength, experienceResult.confidence)
            : "No content provided to analyze.";
        const projectsSuggestion = projectsText
            ? await generateSuggestions("Projects", projectsText, projectsResult.strength, projectsResult.confidence)
            : "No content provided to analyze.";

        const confidences = [
            summaryResult.confidence,
            skillsResult.confidence,
            experienceResult.confidence,
            projectsResult.confidence,
        ];
        const overallConfidence = Math.round(confidences.reduce((a, b) => a + b, 0) / confidences.length * 100) / 100;

        const overallSuggestion = await generateSuggestions(
            "Overall Resume",
            `${summary}\n${skillsText}\n${workExperienceText}\n${projectsText}`,
            overallConfidence > 80 ? "strong" : overallConfidence > 60 ? "moderate" : "weak",
            overallConfidence
        );

        return NextResponse.json({
            summary: {
                ...summaryResult,
                suggestion: summarySuggestion,
            },
            skills: {
                ...skillsResult,
                suggestion: skillsSuggestion,
            },
            experience: {
                ...experienceResult,
                suggestion: experienceSuggestion,
            },
            projects: {
                ...projectsResult,
                suggestion: projectsSuggestion,
            },
            overall: {
                strength:
                    overallConfidence > 80
                        ? "strong"
                        : overallConfidence > 60
                            ? "moderate"
                            : "weak",
                confidence: overallConfidence,
                suggestion: overallSuggestion,
            },
        });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
        });
    }
}
