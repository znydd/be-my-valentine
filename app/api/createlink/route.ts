import { initDb } from "@/db";


export async function POST(req: Request) {
  const db = await initDb();

  const res = await req.json()
  const name = res.name.toString();
  const email = res.email.toString();
  const link = Date.now().toString();

  db.run('INSERT INTO lovers (link, email, name) VALUES (?, ?, ?)', [link, email, name])

  return Response.json({ link })
}