import { Router } from "express";
const router = Router();
import { hints } from "../controller/hintController.js";
router.post("/", hints);
export default router;
