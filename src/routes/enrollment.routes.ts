import { Router } from "express";
import EnrollmentsController from "../controllers/EnrollmentsController";

const router = Router();

router.get("/", (req) => new EnrollmentsController(req.httpContext).get());
router.post("/", (req) => new EnrollmentsController(req.httpContext).post());

export default router;