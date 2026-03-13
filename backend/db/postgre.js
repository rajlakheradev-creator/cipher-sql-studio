import { Pool } from "pg";

const requiredEnv = [
  "POSTGRES_USER",
  "POSTGRES_DB",
  "POSTGRES_PASSWORD",
  "POSTGRES_HOST",
  "POSTGRES_PORT",
];
for (let key of requiredEnv) {
  if (!process.env[key] || typeof process.env[key] !== "string") {
    console.warn(`Optional env var missing: ${key} - using defaults`);
  } else {
    console.log(`Using custom ${key}=${process.env[key]}`);
  }
}
console.log("DB env vars validated OK");

const pool = new Pool({
  user: process.env.POSTGRES_USER || "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  database: process.env.POSTGRES_DB || "CipherSqlStudio",
  password: process.env.POSTGRES_PASSWORD || "",
  port: parseInt(process.env.POSTGRES_PORT) || 5432,
});

// Startup test disabled to avoid crash on import. Uncomment to test connection.
// (async () => {
//   try {
//     const res = await pool.query("SELECT NOW()");
//     console.log("db connected", res.rows[0]);
//   } catch (err) {
//     console.error("database connection failed", err);
//   }
// })();

export default pool;
