import { Router } from "express";
import PeopleController from "../controllers/PeopleController";
import { authorize, queryWithPermission } from "../middlewares/authzMiddleware";

const router = Router();

router.get("/", queryWithPermission('#read'),(req) => new PeopleController(req.httpContext).get());
router.post("/", authorize("person#create"), (req) => new PeopleController(req.httpContext).post());

export default router;