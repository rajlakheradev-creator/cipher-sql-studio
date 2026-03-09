import { Router } from 'express';
const router=Router;
import { executeQuery } from "../controller/executeController";
router.post("/execute",executeQuery);
export default router;