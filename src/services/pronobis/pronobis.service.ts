import { callPronobisGet } from "../../clients/pronobis.httpClient";
import { mapCliente } from "../../mappers/cliente.mapper";
import { mapProyecto } from "../../mappers/proyecto.mapper";

export const obtenerClienteYProyectos = async (cedula: string) => {
  const clienteRows = await callPronobisGet(
    "PronobisTrack_Consulta_Cliente",
    { sCCiIdentificacion: cedula }
  );

  const cliente =
    clienteRows && clienteRows.length > 0
      ? mapCliente(clienteRows[0])
      : null;

  const proyectoRows = await callPronobisGet(
    "PronobisTrack_Consulta_Proyectos",
    { sCCiIdentificacion: cedula }
  );

  const proyectos =
    proyectoRows?.map(mapProyecto) ?? null;

  return {
    success: true,
    data: {
      cliente,
      proyectos,
    },
  };
};
