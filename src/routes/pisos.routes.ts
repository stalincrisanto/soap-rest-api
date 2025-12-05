import { Router } from "express";
import { consultarPisos } from "../controllers/pisos.controller";

const router = Router();

// GET /api/pronobis/pisos/:cedula/:compania/:proyecto
router.get("/:cedula/:compania/:proyecto", consultarPisos);

export default router;
