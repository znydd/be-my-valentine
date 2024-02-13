import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function initDb() {

    try {
        const result =await sql`CREATE TABLE IF NOT EXISTS lovers ( Link varchar(255), Email varchar(255), Name varchar(255) );`; 
        return NextResponse.json({ result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
     // Schedule the deletation of DB to run every 24 hours

  
}

