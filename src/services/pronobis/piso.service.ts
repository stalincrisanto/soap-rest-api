import { callPronobisGet } from "../../clients/pronobis.httpClient";
import { mapPiso } from "../../mappers/piso.mapper";
import { logger } from "../../utils/logger";

export const obtenerPisos = async (
  identificacion: string,
  compania: string,
  proyecto: string
) => {
  logger.process("Obteniendo pisos Pronobis", {
    identificacion,
    compania,
    proyecto,
  });

  const rows = await callPronobisGet("PronobisTrack_Consulta_Pisos", {
    sCCiIdentificacion: identificacion,
    sCCiCompania: compania,
    sCCiProyecto: proyecto,
  });

  const pisos = rows?.map(mapPiso) ?? null;

  logger.success("Pisos Pronobis obtenidos", {
    identificacion,
    total: pisos?.length ?? 0,
  });

  return {
    success: true,
    data: pisos,
  };
};
