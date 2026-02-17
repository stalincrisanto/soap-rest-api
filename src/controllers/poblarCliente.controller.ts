import { Request, Response } from "express";
import { obtenerClienteYProyectos } from "../services/pronobis/pronobis.service";
import { logger } from "../utils/logger";

export const consultarInfoPronobis = async (req: Request, res: Response) => {
  try {
    const { cedula } = req.params;
    logger.process("Consultando información Pronobis", { cedula });

    const response = await obtenerClienteYProyectos(cedula);

    logger.success("Consulta Pronobis completada", { cedula });
    res.json(response);
  } catch (error: any) {
    logger.error("Error consultando Pronobis", {
      message: error?.message,
      stack: error?.stack,
    });

    res.status(500).json({
      success: false,
      message: error?.message || "Error al consultar Pronobis",
    });
  }
};
