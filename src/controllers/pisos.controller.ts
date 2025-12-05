import { Request, Response } from "express";
import { obtenerPisos } from "../services/piso.service";

export const consultarPisos = async (req: Request, res: Response) => {
  const { cedula, compania, proyecto } = req.params;

  const result = await obtenerPisos(cedula, compania, proyecto);

  res.json(result);
};
