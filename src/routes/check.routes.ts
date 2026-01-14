import { Router } from "express";
import { checkApi } from "../controllers/check.controller";

const router = Router();

router.get("/", checkApi);

export default router;
