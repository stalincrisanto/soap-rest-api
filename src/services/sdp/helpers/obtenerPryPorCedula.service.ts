import { sdpHttpClient } from "../../../clients/sdpHttp.client";
import {
  CmProyecto,
  CmProyectoSearchResponse,
} from "../../../types/sdp/cm-proyectos.response";

export const obtenerProyectosPorCedula = async (
  cedula: string
): Promise<CmProyecto[]> => {
  const inputData = {
    list_info: {
      search_criteria: {
        field: "cm_attributes.txt_cedula_cliente",
        value: cedula,
        condition: "eq",
      },
      fields_required: ["id", "cm_attributes.txt_name"],
      start_index: 1,
      row_count: 200,
    },
  };

  const response = await sdpHttpClient.get<CmProyectoSearchResponse>(
    "/api/v3/cm_proyecto",
    {
      params: {
        input_data: JSON.stringify(inputData),
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data.cm_proyecto ?? [];
};
