import { Router } from "express";
import { consultarInmuebles } from "../controllers/inmueble.controller";

const router = Router();

// GET /api/pronobis/inmuebles/:cedula/:compania/:proyecto/:piso
router.get("/:cedula/:compania/:proyecto/:piso", consultarInmuebles);

export default router;
