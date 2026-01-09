import { sdpHttpClient } from "../../../clients/sdpHttp.client";
import { CmClienteSearchResponse } from "../../../types/sdp/cm-cliente.response";

export const obtenerClienteYCedulaPorValorCedula = async (
  cedula: string
): Promise<{ clienteId: string; cedulaId: string } | null> => {
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
    return null;
  }

  return {
    clienteId: registros[0].id,
    cedulaId: registros[0].cm_attributes.ref_cedula.id,
  };
};
