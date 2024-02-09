import { initDb } from "@/db";


export async function POST(req: Request) {
    const db = await initDb();

    console.log("api hitted")
    const res = await req.json()
    const name = res.name.toString();
    const email = res.email.toString();
    const link = Date.now().toString(); 
    
    console.log(name)
    console.log(email)
    console.log(link)
    db.run('INSERT INTO lovers (link, email, name) VALUES (?, ?, ?)',[link, email, name])
 

    return Response.json({ link })
  }