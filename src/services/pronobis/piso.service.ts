import { callPronobisGet } from "../../clients/pronobis.httpClient";
import { mapPiso } from "../../mappers/piso.mapper";

export const obtenerPisos = async (
  identificacion: string,
  compania: string,
  proyecto: string
) => {
  const rows = await callPronobisGet(
    "PronobisTrack_Consulta_Pisos",
    {
      sCCiIdentificacion: identificacion,
      sCCiCompania: compania,
      sCCiProyecto: proyecto,
    }
  );

  const pisos = rows?.map(mapPiso) ?? null;

  return {
    success: true,
    data: pisos,
  };
};
