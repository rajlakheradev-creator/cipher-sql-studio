import express from "express";
import { json } from "express";
import cors from "cors";
import pool from "./db/postgre.js";
 const app= express();
const PORT=8000;

app.use(cors());
app.use(json());

app.use("/api/assignments",require("./routes/assigment.js").default);
app.use("/api/execute",require("./routes/execute.js").default);
app.use("/api/hints",require("./routes/hint.js").default);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);