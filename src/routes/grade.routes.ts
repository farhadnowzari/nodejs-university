import { Router } from "express";
import GradesController from "../controllers/GradesController";

const router = Router();

router.get("/",(req) => new GradesController(req.httpContext).get());
router.post("/", (req) => new GradesController(req.httpContext).post());

export default router;