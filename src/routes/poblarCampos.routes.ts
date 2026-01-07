import { Router } from "express";
import { poblarCamposController } from "../controllers/poblarCampos.controller";

const router = Router();

router.get("/:cedula", poblarCamposController);

export default router;
