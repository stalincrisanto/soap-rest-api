import { sdpHttpClient } from "../../../clients/sdpHttp.client";
import {
  CmPiso,
  CmPisoSearchResponse,
} from "../../../types/sdp/cm-piso.response";

export const obtenerPisosPorCedula = async (
  cedula: string,
): Promise<CmPiso[]> => {
  const inputData = {
    list_info: {
      search_criteria: {
        field: "cm_attributes.txt_cedula_cliente",
        value: cedula,
        condition: "eq",
      },
      fields_required: [
        "id",
        "cm_attributes.txt_name",
        "cm_attributes.txt_cedula_cliente",
        "cm_attributes.ref_proyecto.id",
      ],
      start_index: 1,
      row_count: 200,
    },
  };

  const response = await sdpHttpClient.get<CmPisoSearchResponse>(
    "/api/v3/cm_piso",
    {
      params: {
        input_data: JSON.stringify(inputData),
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data.cm_piso ?? [];
};
