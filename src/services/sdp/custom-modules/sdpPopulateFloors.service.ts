import { sdpHttpClient } from "../../../clients/sdpHttp.client";

export const poblarPisos = async (
  pisos: string[],
  cedula: string,
  proyectoId: string
) => {
  for (const piso of pisos) {
    const body = new URLSearchParams({
      input_data: JSON.stringify({
        cm_piso: {
          cm_attributes: {
            txt_cedula_cliente: cedula,
            ref_proyecto: { id: proyectoId },
            txt_name: piso,
          },
        },
      }),
    });

    await sdpHttpClient.post("/api/v3/cm_piso", body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  }
};
