import { Request, Response } from "express";
import { obtenerInmuebles } from "../services/inmueble.service";

export const consultarInmuebles = async (req: Request, res: Response) => {
  const { cedula, compania, proyecto, piso } = req.params;

  const result = await obtenerInmuebles(cedula, compania, proyecto, piso);

  res.json(result);
};
