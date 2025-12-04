import { callPronobisGet } from "./httpClient";
import { mapCliente } from "./cliente.mapper";
import { mapProyecto } from "./proyecto.mapper";

export const obtenerClienteYProyectos = async (cedula: string) => {
  // 1. Consultar cliente
  const clienteRows = await callPronobisGet(
    "PronobisTrack_Consulta_Cliente",
    { sCCiIdentificacion: cedula }
  );

  const cliente =
    clienteRows && clienteRows.length > 0
      ? mapCliente(clienteRows[0])
      : null;

  // 2. Consultar proyectos
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
