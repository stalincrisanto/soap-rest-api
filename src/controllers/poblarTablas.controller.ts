import { Request, Response } from "express";
import { poblarTablasSdp } from "../services/sdp/custom-modules/poblarTablas.service";
import { logger } from "../utils/logger";

export const poblarTablasController = async (req: Request, res: Response) => {
  try {
    const { cedula } = req.params;

    if (!cedula) {
      logger.error("Parámetro cédula obligatorio");
      return res.status(400).json({
        success: false,
        message: "Parámetro cédula obligatorio",
      });
    }

    logger.process("Iniciando poblar tablas", { cedula });
    await poblarTablasSdp(cedula);
    logger.success("Poblar tablas finalizado", { cedula });

    return res.status(200).json({
      success: true,
      message: "Operación ejecutada correctamente",
    });
  } catch (error: any) {
    logger.error("Error en poblar tablas", {
      message: error?.message,
      stack: error?.stack,
    });

    return res.status(500).json({
      success: false,
      message: error.message || "Error al ejecutar la operación",
    });
  }
};
