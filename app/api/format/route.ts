import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";
const API_KEY = process.env.GOOGLE_API_KEY;

async function generateContent(prompt: string): Promise<string | undefined> {
  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "private, max-age=300, s-maxage=300",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const content = data?.candidates?.[0]?.content?.parts?.[0]?.text || null;
      return content;
    } else {
      console.error(`Failed to generate content: ${response.statusText}`);
    }
  } catch (error: any) {
    console.error(`Error: ${error}`);
    return error;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { resume, format } = body;

    if (!resume) {
      return NextResponse.json(
        { error: "Missing 'resume' in request body." },
        { status: 400 }
      );
    }

    const prompt = `
      I'll provide you with a text from a resume I just found. The text might not be perfect and may have weird formatting due to its PDF nature, but I want you to generate JSON from it. 
      Here is the resume: ${resume}. 
      Please provide the JSON in the following format: ${
        format === "detailed"
          ? `{
            name: string; position: string; number: string; email: string; address: string; profilePicture?: string; 
            socialMedia: { socialMedia: string; link: string; }[]; summary: string; education: { school: string; degree: string; startYear: string; endYear: string; }[]; 
            workExperience: { company: string; position: string; description?: string; keyAchievements?: string; startYear: string; endYear: string; }[]; 
            projects: { name: string; link: string; description?: string; keyAchievements?: string; startYear: string; endYear: string; }[]; 
            skills: { title: string; skills?: string[]; }[]; certifications?: string[]; languages?: string[];
          }`
          : `{
            summary: string; 
            skills: { title: string; skills: string[]; }[]; 
            workExperience: { company: string; position: string; }[]; 
            projects: { name: string; description: string; }[]
          }`
      }
      Avoid markdown formatting and just give me the raw JSON. Remove unnecessary spaces and all okay? Don't make your own stuff and only extract from the text, but fix spaces and grammar.
    `;

    const generatedContent = await generateContent(prompt);

    if (!generatedContent) {
      return NextResponse.json(
        { error: "Failed to generate content from API." },
        { status: 500 }
      );
    }

    try {
      const jsonContent = JSON.parse(
        generatedContent.replace(/```json\n?/, "").replace(/\n```/, "")
      );
      return NextResponse.json(jsonContent);
    } catch (err) {
      console.error("Error parsing JSON:", err);
      return NextResponse.json(
        { error: "Failed to parse the generated JSON." },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("Error processing request:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
