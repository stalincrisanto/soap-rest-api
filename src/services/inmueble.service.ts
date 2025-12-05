import { callPronobisGet } from "./httpClient";
import { mapInmueble } from "./inmueble.mapper";

export const obtenerInmuebles = async (
  identificacion: string,
  compania: string,
  proyecto: string,
  piso: string
) => {
  const rows = await callPronobisGet(
    "PronobisTrack_Consulta_Inmuebles",
    {
      sCCiIdentificacion: identificacion,
      sCCiCompania: compania,
      sCCiProyecto: proyecto,
      sCCiPiso: piso
    }
  );

  const inmuebles = rows?.map(mapInmueble) ?? null;

  return {
    success: true,
    data: inmuebles,
  };
};
