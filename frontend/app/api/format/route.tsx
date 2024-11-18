

export async function POST(req: Request) {
  const body = await req.json();

  console.log(body);
  const format = await fetch(`${process.env.ANALYZE_API}/format`, {
    method: "POST",
    body: JSON.stringify({resume: body.text}),
    headers: {
      "Content-type": "application/json",
    },
  });

  const formatted = await format.text();

  return new Response(formatted, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
