import { callPronobisGet } from "../../clients/pronobis.httpClient";
import { mapInmueble } from "../../mappers/inmueble.mapper";
import { logger } from "../../utils/logger";

export const obtenerInmuebles = async (
  identificacion: string,
  compania: string,
  proyecto: string,
  piso: string
) => {
  logger.process("Obteniendo inmuebles Pronobis", {
    identificacion,
    compania,
    proyecto,
    piso,
  });

  const rows = await callPronobisGet("PronobisTrack_Consulta_Inmuebles", {
    sCCiIdentificacion: identificacion,
    sCCiCompania: compania,
    sCCiProyecto: proyecto,
    sCCiPiso: piso,
  });

  const inmuebles = rows?.map(mapInmueble) ?? null;

  logger.success("Inmuebles Pronobis obtenidos", {
    identificacion,
    total: inmuebles?.length ?? 0,
  });

  return {
    success: true,
    data: inmuebles,
  };
};
