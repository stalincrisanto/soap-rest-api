import { Request, Response } from "express";
import { obtenerClienteYProyectos } from "../services/pronobis.service";

export const consultarInfoPronobis = async (req: Request, res: Response) => {
  const { cedula } = req.params;

  const response = await obtenerClienteYProyectos(cedula);

  res.json(response);
};
