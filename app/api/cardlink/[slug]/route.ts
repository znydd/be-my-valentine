import { initDb } from "@/db"
import { sql } from "@vercel/postgres";

type Lover = [{
    link: string,
    email: string,
    name: string,
}];

export async function GET(req:Request, { params }: { params: { slug: string } }) {
    const db_obj = await initDb();
    const slug = params.slug;


    const resp = await sql`SELECT email, name FROM lovers WHERE link = ${slug}`; 
       
      if(Object.keys(resp).length == 0){
        const respObj = {email: "no@gmail.com",
                          name: "Love"
                          }
        return Response.json(respObj)
      }
      return Response.json(resp)
    
}



