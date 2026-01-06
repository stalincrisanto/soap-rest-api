import { Router } from "express";
import { modificarSelectores } from "../controllers/spd.controller";

const router = Router();

router.get("/:cedula", modificarSelectores);

export default router;
