import cron from "node-cron";
import { initDb } from "@/db"


async function deleteTableData () {
    const db = await initDb();
    const deleteQuery = `DELETE FROM lovers`;
    db.run(deleteQuery, (err) => {
      if (err) {
        console.error('Error deleting data:', err.message);
      } else {
        console.log(`Data deleted from lovers successfully.`);
      }
    });
  }
  
  // Schedule the deletation of DB to run every 24 hours
  cron.schedule('0 0 */1 * *', () => {
    deleteTableData();
  });
  