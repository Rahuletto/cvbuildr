import { createClient } from "@supabase/supabase-js";
import { NextRequest } from "next/server";

const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";
const API_KEY = process.env.GOOGLE_API_KEY;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function rewriteSummary(summary: string): Promise<string> {
  const prompt = `
    Rewrite it and make it look like i wrote it, dont mention he or she say its I.
    Dont summarize, if possible make it longer but less than 450 characters and also add some more details and proofread and professional and make it excel at ATS systems.
    Make it as humanly sounding as possible, doesnt have to feel like AI wrote it, so be very humanly possible.
    Make it look professional and im aiming for FAANG jobs so keep it elegant and professional. make it look like i wrote it, dont mention he or she say its I. Should be first-person text.
    It should be looking like I wrote it, not you. Make it very very professional please, no humour its all should be professional as im aiming for FAANG. Dont make me to edit it, ill forget so dont give spaces for me to fill. DO NOT GIVE SPACES TO FILL, DO EVERYTHING ON YOUR OWN. Here is the text:
    Text: "${summary}"
    `;

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
      generationConfig: { temperature: 0.8, maxOutputTokens: 512 },
    }),
  });

  if (response.ok) {
    const data = await response.json();
    const content = data?.candidates?.[0]?.content?.parts?.[0]?.text || null;
    return content;
  } else {
    console.error(`Error: ${response.status} - ${await response.text()}`);
    return (
      "Failed to rewrite with Error: " +
      response.status +
      " - " +
      response.statusText
    );
  }
}

// POST Handler for the Rewrite Summary Endpoint
export async function POST(req: NextRequest) {
  try {
    const { summary }: { summary: string } = await req.json();
    const auth = req.headers.get("Authorization");

    const { data } = await supabase
      .from("Resume")
      .select("subscribed")
      .eq("uuid", auth)
      .maybeSingle();

    if (!data || !data.subscribed) {
      return new Response(
        JSON.stringify({
          error: "Unauthorized. Please subscribe to use this feature.",
        }),
        { status: 401 }
      );
    }

    if (!summary || summary.trim().length === 0) {
      return new Response(
        JSON.stringify({
          error: "Invalid input. The summary cannot be empty.",
        }),
        { status: 400 }
      );
    }

    const rewrittenSummary = await rewriteSummary(summary);

    return Response.json(
      { original: summary, rewritten: rewrittenSummary },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
