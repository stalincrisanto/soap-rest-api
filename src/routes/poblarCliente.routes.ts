import { Router } from "express";
import { consultarInfoPronobis } from "../controllers/poblarCliente.controller";

const router = Router();

router.get("/:cedula", consultarInfoPronobis);

export default router;