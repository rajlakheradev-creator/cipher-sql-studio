import pool from "../db/postgre.js";
export async function assignments(req, res) {
  try {
    const result = await pool.query("SELECT * FROM assignments");
    res.json(result.rows); // it is used to get rows
  } catch (err) {
    console.error("Internal error in Db", err);
    res.status(500).json({ error: "Failed to fetch assignments" });
  }
}

export async function assignments2(req, res) {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({ error: "ID is required" });
  } else {
    try {
      const result1 = await pool.query(
        "SELECT * FROM assignments WHERE id=$1",
        [id],
      );

      if (result1.rows.length === 0) {
        return res.status(404).json({ error: "no query containing id" });
      } else {
        res.json(result1.rows);
      } // it is used to get rows
    } catch (err) {
      console.error("Internal error in Db", err);
      res.status(500).json({ error: "Failed to fetch assignments" });
    }
  }
}

export async function assignmentsPost(req, res) {
  const extract = req.body;
  const title = extract.title;
  const description = extract.description;
  const difficulty = extract.difficulty;
  const query =
    "INSERT INTO assignments(title,description,difficulty )VALUES($1,$2,$3)RETURNING *";
  const values = [title, description, difficulty];
  if (!title || !difficulty || !description) {
return res.status(400).json({ error: "Values are missing" });
  } else {
    try {
      const data = await pool.query(query, values);
      res.status(201).json(data.rows[0]);
    } catch (err) {
      console.error("Internal error in Db", err);
      res.status(500).json({ error: "Failed to insert assignments" });
    }
  }
}

export async function assignmentsUpdate(req, res) {
  const { id } = req.params;
  const { title, description, difficulty } = req.body;

  if (!title || !difficulty || !description) {
return res.status(400).json({ error: "Values are missing" });
  } else {
    try {
      const UpdateQuery =
        "UPDATE assignments SET title=$1,description=$2,difficulty=$3 WHERE id=$4 RETURNING *";
      const values1 = [title, description, difficulty, id];
      const dataupdate = await pool.query(UpdateQuery, values1);
      if (dataupdate.rows.length === 0) {
        return res.status(404).json({ error: "Assignment not found" });
      }
      res.json(dataupdate.rows[0]);
    } catch (err) {
      console.error("Internal error in Db", err);
      res.status(500).json({ error: "Failed to update assignments" });
    }
  }
}
