import React from "react";
import Editor from "../Editor";
import { getServerSession } from "next-auth";
import { authOptions } from "@/types/AuthOptions";
import { redirect } from "next/navigation";
import DefaultResumeData from "../../components/utility/DefaultResumeData";
import { ResumeForm } from "@/types/FormData";
import { headers } from "next/headers";

export default async function Page({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const slug = (await params).type;

  const session = await getServerSession(authOptions);

  if (!session) return redirect("/signin");

  const headersList = await headers();
  const fullUrl =
    headersList.get("referer")?.split("/edit")[0] ||
    "https://cvbuildr.vercel.app";

  const data = await fetch(
    // @ts-expect-error idk
    fullUrl + `/api/users?uuid=${session.user.id}`
  );

  const body: ResumeForm & { error: string } = await data.json();

  if (data.status === 404 || body.error) {
    const obj = { ...DefaultResumeData };
    obj.name = session.user?.name as string;
    obj.email = session.user?.email as string;
    obj.summary = "Hi! I am " + obj.name;

    // @ts-expect-error idk
    const r = await fetch(fullUrl + `/api/save?uuid=${session.user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // @ts-expect-error idk
        uuid: session.user?.id,
        ...obj,
      }),
    });

    const res = await r.json();

    return <Editor json={res} type={slug} />;
  }

  return <Editor json={body} type={slug} />;
}
