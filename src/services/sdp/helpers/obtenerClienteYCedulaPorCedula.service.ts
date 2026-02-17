import { sdpHttpClient } from "../../../clients/sdpHttp.client";
import { CmClienteSearchResponse } from "../../../types/sdp/cm-cliente.response";
import { logger } from "../../../utils/logger";

export const obtenerClienteYCedulaPorValorCedula = async (
  cedula: string
): Promise<{ clienteId: string; cedulaId: string } | null> => {
  logger.process("Consultando cliente y cédula en SDP", { cedula });

  const inputData = {
    list_info: {
      search_criteria: {
        field: "cm_attributes.ref_cedula.cm_attributes.txt_name",
        value: cedula,
        condition: "eq",
      },
      fields_required: ["id", "cm_attributes.ref_cedula.id"],
      start_index: 1,
      row_count: 1,
    },
  };

  const response = await sdpHttpClient.get<CmClienteSearchResponse>(
    "/api/v3/cm_cliente",
    {
      params: {
        input_data: JSON.stringify(inputData),
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const registros = response.data.cm_cliente;

  if (!registros || registros.length === 0) {
    logger.success("No existe relación cliente-cédula en SDP", { cedula });
    return null;
  }

  const result = {
    clienteId: registros[0].id,
    cedulaId: registros[0].cm_attributes.ref_cedula.id,
  };

  logger.success("Cliente y cédula encontrados en SDP", {
    cedula,
    clienteId: result.clienteId,
    cedulaId: result.cedulaId,
  });

  return result;
};
