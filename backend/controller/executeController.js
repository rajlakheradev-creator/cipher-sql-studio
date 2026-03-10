import pool from "../db/postgre.js";
export async function executeQuery(req, res) {
  try {
    const { query } = req.body;

    // Validate query exists
    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).json({ error: "Failed to execute query" });
  }
}
