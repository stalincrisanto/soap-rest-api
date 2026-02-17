import { callPronobisGet } from "../../clients/pronobis.httpClient";
import { mapCliente } from "../../mappers/cliente.mapper";
import { mapProyecto } from "../../mappers/proyecto.mapper";
import { logger } from "../../utils/logger";

export const obtenerClienteYProyectos = async (cedula: string) => {
  logger.process("Obteniendo cliente y proyectos", { cedula });

  const clienteRows = await callPronobisGet("PronobisTrack_Consulta_Cliente", {
    sCCiIdentificacion: cedula,
  });

  const cliente =
    clienteRows && clienteRows.length > 0 ? mapCliente(clienteRows[0]) : null;

  const proyectoRows = await callPronobisGet(
    "PronobisTrack_Consulta_Proyectos",
    { sCCiIdentificacion: cedula }
  );

  const proyectos = proyectoRows?.map(mapProyecto) ?? null;

  logger.success("Cliente y proyectos obtenidos", {
    cedula,
    clienteEncontrado: Boolean(cliente),
    proyectos: proyectos?.length ?? 0,
  });

  return {
    success: true,
    data: {
      cliente,
      proyectos,
    },
  };
};
