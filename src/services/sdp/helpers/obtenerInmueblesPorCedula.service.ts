import { sdpHttpClient } from "../../../clients/sdpHttp.client";
import {
  CmInmuebleSearchResponse,
  CmInmueble,
} from "../../../types/sdp/cm-inmueble.response";
import { logger } from "../../../utils/logger";

export const obtenerInmueblesPorCedula = async (
  cedula: string
): Promise<CmInmueble[]> => {
  logger.process("Consultando inmuebles en SDP", { cedula });

  const inputData = {
    list_info: {
      search_criteria: {
        field: "cm_attributes.txt_cedula_cliente",
        condition: "eq",
        value: cedula,
      },
      fields_required: [
        "id",
        "cm_attributes.txt_name",
        "cm_attributes.ref_proyecto.id",
        "cm_attributes.ref_piso.id",
      ],
      start_index: 1,
      row_count: 500,
    },
  };

  const response = await sdpHttpClient.get<CmInmuebleSearchResponse>(
    "/api/v3/cm_inmueble",
    {
      params: {
        input_data: JSON.stringify(inputData),
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const inmuebles = response.data.cm_inmueble ?? [];
  logger.success("Inmuebles SDP obtenidos", { cedula, total: inmuebles.length });

  return inmuebles;
};
