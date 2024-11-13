export async function PATCH(req: Request) {
  const body = await req.json();

  const r = await fetch(`${process.env.JAVA_API}/api/users`, {
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
    status: r.status
  });
}
