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
      if(Object.keys(resp).length == 0){
        const respObj = {email: "no@gmail.com",
                          name: "Love"
                          }
        return Response.json(respObj)
      }
      return Response.json(resp[0])
    
}



