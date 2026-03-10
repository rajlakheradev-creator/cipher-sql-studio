import { Router } from 'express';
const router=Router();
import { hints } from "../controller/hintController";
 router.post("/",hints);
export default router;