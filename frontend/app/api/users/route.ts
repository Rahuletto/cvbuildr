import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const uuid = searchParams.get("uuid");

        if (!uuid) {
            return NextResponse.json({ error: "UUID is required" }, { status: 400 });
        }

        const { data, error, status } = await supabase
            .from("Resume")
            .select("data")
            .eq("uuid", uuid)
            .maybeSingle();

        console.log(data)
        console.log(error)
        console.log(status)

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }
        if (!data) {

            return NextResponse.json({ error: "No data found for the given uuid" }, { status: 404 });
        }

        return NextResponse.json(data.data, { status: 200 })
    } catch (error) {
        console.error("Internal server error: ", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}

