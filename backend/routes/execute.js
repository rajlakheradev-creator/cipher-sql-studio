import { Router } from "express";
const router = Router();
import { executeQuery } from "../controller/executeController.js";
router.post("/execute", executeQuery);
export default router;
