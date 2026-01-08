import { Router } from "express";
import { poblarTablasController } from "../controllers/poblarTablas.controller";

const router = Router();

router.get("/:cedula", poblarTablasController);

export default router;
