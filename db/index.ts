import sqlite3 from "sqlite3";

export async function initDb() {
    const db = new sqlite3.Database("./sqlite.db");
    db.run("CREATE TABLE IF NOT EXISTS lovers (link TEXT, email TEXT, name TEXT)");
    return db;
}

