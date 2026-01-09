import { Request, Response } from "express";
import { poblarTablasSdp } from "../services/sdp/custom-modules/poblarTablas.service";

export const poblarTablasController = async (req: Request, res: Response) => {
  try {
    const { cedula } = req.params;

    if (!cedula) {
      return res.status(400).json({
        success: false,
        message: "Parámetro cédula obligatorio",
      });
    }

    await poblarTablasSdp(cedula);

    return res.status(200).json({
      success: true,
      message: "Operación ejecutada correctamente",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Error al ejecutar la operación",
    });
  }
};
