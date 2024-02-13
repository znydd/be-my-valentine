import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function initDb() {

    try {
        const result =await sql`CREATE TABLE IF NOT EXISTS lovers (link TEXT, email TEXT, name TEXT);`; 
        console.log("table created")
        return NextResponse.json({ result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

