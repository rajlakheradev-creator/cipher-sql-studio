import pool from "../db/postgre.js";
import pkg from "node-sql-parser";

const { Parser } = pkg;

const parser = new Parser();

const DANGEROUS_KEYWORDS =
  /\b(DROP|DELETE|TRUNCATE|INSERT|UPDATE|ALTER|CREATE|GRANT|REVOKE|EXECUTE|LOAD|IMPORT|pg_read_file|pg_ls_dir|pg_sleep|generate_series)\b/i;
const DANGEROUS_TABLES = /\b(pg_|information_schema|pg_catalog)\b/i;

export async function executeQuery(req, res) {
  try {
    const { query } = req.body;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ error: "Valid query string is required" });
    }

    if (query.length > 10000) {
      return res.status(413).json({ error: "Query too long" });
    }

    const trimmed = query.trim().toUpperCase();

    // Basic prefix check
    if (!trimmed.startsWith("SELECT")) {
      return res.status(403).json({
        error: "Only SELECT queries are allowed",
      });
    }

    // Enhanced keyword block
    if (DANGEROUS_KEYWORDS.test(query) || DANGEROUS_TABLES.test(query)) {
      return res.status(403).json({
        error: "Query contains forbidden keywords or tables",
      });
    }

    // AST validation with node-sql-parser
    try {
      const ast = parser.astify(query);

      // Check it's a SELECT statement
      if (!ast || ast.type !== "select") {
        return res.status(403).json({
          error: "Only simple SELECT statements allowed",
        });
      }

      // Block subqueries, CTEs, advanced features for safety
      if (ast.with || ast.from.length > 3 || ast.where?.complex) {
        return res.status(403).json({
          error: "Complex queries not allowed (subqueries/CTEs)",
        });
      }

      // Block dangerous functions
      const forbiddenFunctions = [
        "pg_sleep",
        "pg_read_file",
        "pg_ls_dir",
        "version",
        "current_setting",
      ];
      const hasForbiddenFn = forbiddenFunctions.some((fn) =>
        query.toLowerCase().includes(fn),
      );
      if (hasForbiddenFn) {
        return res.status(403).json({ error: "Forbidden functions detected" });
      }
    } catch (parseErr) {
      return res.status(400).json({ error: "Invalid SQL syntax" });
    }

    // Safe to execute
    const result = await pool.query(query);
    res.json({
      rows: result.rows,
      rowCount: result.rowCount,
      fields: result.fields?.map((f) => f.name) || [],
    });
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).json({ error: "Failed to execute query" });
  }
}
