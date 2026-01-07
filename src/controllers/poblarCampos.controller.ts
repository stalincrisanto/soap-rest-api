import { Request, Response } from "express";
import { obtenerClienteYProyectos } from "../services/pronobis.service";
import { poblarCamposPorCedula } from "../services/sdp/poblarCampos.service";

export const poblarCamposController = async (req: Request, res: Response) => {
  const { cedula } = req.params;

  console.log("--------------->Valor dee la cedula---->", cedula);

  const response = await poblarCamposPorCedula(cedula);

  res.json(response);
};
