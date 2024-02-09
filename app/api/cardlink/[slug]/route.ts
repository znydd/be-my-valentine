import { initDb } from "@/db"

type Lover = [{
    link: string,
    email: string,
    name: string,
}];

export async function GET(req:Request, { params }: { params: { slug: string } }) {
    const db = await initDb();
    const slug = params.slug;
    console.log(slug)

    const resp:Lover = await new Promise((resolve, reject) => {
        db.all(`SELECT email, name FROM lovers WHERE link = ${slug}`, (err: Error, rows:Lover) => {
          if (err) reject(err);
          else resolve(rows); 
        });
      });
      console.log(resp)
      return Response.json(resp)
    
}



