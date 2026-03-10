import { Router } from 'express';
const router=Router();
import { assignments,assignments2,assignmentsPost,assignmentsUpdate} from "../controller/assignmentController";
    router.get("/",assignments);
    router.get("/:id",assignments2);
    router.post("/",assignmentsPost);
    router.put("/:id",assignmentsUpdate);
export default router;