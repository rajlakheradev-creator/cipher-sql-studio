import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import assignmentsRouter from "./routes/assigment.js";
import executeRouter from "./routes/execute.js";
import hintsRouter from "./routes/hint.js";

dotenv.config({ path: "../.env" });

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

// Root route - API info
app.get("/", (req, res) => {
  res.json({
    message: "Cipher SQL Studio API",
    endpoints: {
      assignments: "/api/assignments",
      execute: "/api/execute",
      hints: "/api/hints",
    },
    status: "running",
  });
});

app.use("/api/assignments", assignmentsRouter);
app.use("/api/execute", executeRouter);
app.use("/api/hints", hintsRouter);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
