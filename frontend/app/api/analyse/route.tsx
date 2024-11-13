

export async function POST(req: Request) {
    const body = await req.json();
  
    const r = await fetch("http://localhost:8000/analyse", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json",
      },
    });
  
    const res = await r.json();
  
    return new Response(JSON.stringify(res), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  