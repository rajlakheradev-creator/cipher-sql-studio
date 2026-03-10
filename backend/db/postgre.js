import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: "localhost",
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
});

(async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("db connected", res.rows[0]);
  } catch (err) {
    console.error("database connection failed", err);
  }
})();
export default pool;
