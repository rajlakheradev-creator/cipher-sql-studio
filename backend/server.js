import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import assignmentsRouter from "./routes/assignment.js";
import executeRouter from "./routes/execute.js";
import hintsRouter from "./routes/hint.js";

dotenv.config({ path: ["../.env", ".env", "backend/.env"], override: true });

const app = express();
const PORT = process.env.PORT || 8000;

// Security middlewares
app.use(helmet()); // Security headers

// Rate limiting
const limiterGeneral = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100, // 100 req per IP
  standardHeaders: true,
  legacyHeaders: false,
});

const limiterExecute = rateLimit({
  windowMs: 60 * 1000, // 1 min
  max: 5, // 5 queries per min
  message: "Too many queries, slow down!",
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiterGeneral);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json({ limit: "1mb" }));

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
app.use("/api/execute", limiterExecute, executeRouter);
app.use("/api/hints", limiterExecute, hintsRouter);

app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).status({ error: "Something went wrong!" });
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
