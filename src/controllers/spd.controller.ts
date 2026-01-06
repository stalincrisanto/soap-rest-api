import { Request, Response } from "express";
import { obtenerClienteYProyectos } from "../services/pronobis.service";
import { getZohoAccessToken } from "../services/sdp/zohoToken.service";

export const modificarSelectores = async (req: Request, res: Response) => {
  const { cedula } = req.params;

  const token = await getZohoAccessToken();

  res.json(token);
};
