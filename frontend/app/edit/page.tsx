import React from "react";
import Editor from "./Editor";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import DefaultResumeData from "../components/utility/DefaultResumeData";
import { ResumeForm } from "@/types/FormData";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) return redirect("/signin");

 
  const data = await fetch(  // @ts-expect-error idk
    `${process.env.JAVA_API}/api/users/${session.user.id}`
  );


  if (data.status === 404) {
    const obj = {...DefaultResumeData};
    obj.name = session.user?.name as string;
    obj.email = session.user?.email as string;
    // obj.profilePicture = session.user?.image as string;

    console.log(obj)

    const r = await fetch(`${process.env.JAVA_API}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // @ts-expect-error idk
        uuid: session.user?.id,
        ...obj
      }),
    });

    const res = await r.json();

    return <Editor json={res} />;
  }

  const json = await data.json();
  
  return <Editor json={json as ResumeForm} />;
}
