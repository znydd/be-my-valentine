import { initDb } from "@/db";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const db = await initDb();

  const res = await req.json()
  const name = res.name.toString();
  const email = res.email.toString();
  const link = Date.now().toString();

  try {
  const resp = await sql`INSERT INTO lovers (Link, Email, Name) VALUES (${link}, ${email}, ${name});`;
  return NextResponse.json({ link }, { status: 200 });
} catch (error) {
  return NextResponse.json({ error }, { status: 500 });
}

}