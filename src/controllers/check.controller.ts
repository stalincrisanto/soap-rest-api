import { Request, Response } from "express";

export const checkApi = async (req: Request, res: Response) => {
  res.json("Respuesta desde api");
};
