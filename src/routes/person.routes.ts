import { Router } from "express";
import PeopleController from "../controllers/PeopleController";

const router = Router();

router.get("/", (req) => new PeopleController(req.httpContext).get());
router.post("/", (req) => new PeopleController(req.httpContext).post());

export default router;