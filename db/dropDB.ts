import cron from "node-cron";
import { sql } from "@vercel/postgres";


cron.schedule('0 0 */1 * *', async () => {
  try {
      await sql`DELETE FROM lovers`
    } catch (error) {
      console.log(error)      
    }
});