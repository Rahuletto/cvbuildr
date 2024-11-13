import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import SigninButton from "../components/Signin";
import { redirect } from "next/navigation";
import HomeButton from "../components/Home";

export default async function Signin() {
    const session = await getServerSession(authOptions);
    if(session) redirect('/')
  return (
    <main className="flex items-center justify-center w-screen h-screen flex-col gap-16">
      <div className="md:w-[81.5%] w-screen lg:h-[250px] h-[350px] p-14 flex gap-6 lg:flex-row flex-col justify-between items-center bg-white border-black border-2">
        <div className="flex flex-col gap-3 md:items-start md:justify-start items-center justify-center">
            <h1 className="font-semibold text-5xl text-center">Sign in</h1>
            <p className="font-medium text-xl text-center">Sign in to Resume Builder to build your career</p>
        </div>
        <SigninButton />
      </div>
      <HomeButton />
    </main>
  );
}
