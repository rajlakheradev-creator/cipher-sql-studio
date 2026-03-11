import pool from "../db/postgre.js";
const DANGEROUS_KEYWORDS = /\b(DROP|DELETE|TRUNCATE|INSERT|UPDATE|ALTER|CREATE|GRANT|REVOKE)\b/i;

export async function executeQuery(req, res) {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    const trimmed = query.trim().toUpperCase();

    // Only allow SELECT statements
    if (!trimmed.startsWith("SELECT")) {
      return res.status(403).json({ 
        error: "Only SELECT queries are allowed" 
      });
    }

    // Block dangerous keywords as extra safety
    if (DANGEROUS_KEYWORDS.test(query)) {
      return res.status(403).json({ 
        error: "Query contains forbidden keywords" 
      });
    }

    const result = await pool.query(query);
    res.json(result.rows);

  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).json({ error: "Failed to execute query" });
  }
}
