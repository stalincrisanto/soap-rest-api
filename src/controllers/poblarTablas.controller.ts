import { Request, Response } from "express";
import { poblarCamposPorCedula } from "../services/sdp/poblarCampos.service";
import { poblarTablasPorCedula } from "../services/sdp/tables/poblarTablas.service";

export const poblarTablasController = async (req: Request, res: Response) => {
  const { cedula } = req.params;

  console.log("Valor de la cedula---->", cedula);

  const response = await poblarTablasPorCedula(cedula);

  res.json(response);
};
