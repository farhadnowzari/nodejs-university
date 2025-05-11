import { Router } from "express";
import CoursesController from "../controllers/CoursesController";

const router = Router();

router.get("/", (req) => new CoursesController(req.httpContext).get());
router.post("/", (req) => new CoursesController(req.httpContext).post());

export default router;