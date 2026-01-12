import { sdpHttpClient } from "../../../clients/sdpHttp.client";

export const poblarInmuebles = async (
  inmuebles: string[],
  cedula: string,
  proyectoSdpId: string,
  pisoSdpId: string
) => {
  for (const inmueble of inmuebles) {
    const body = new URLSearchParams({
      input_data: JSON.stringify({
        cm_inmueble: {
          cm_attributes: {
            txt_cedula_cliente: cedula,
            ref_proyecto: { id: proyectoSdpId },
            ref_piso: { id: pisoSdpId },
            txt_name: inmueble,
          },
        },
      }),
    });

    await sdpHttpClient.post("/api/v3/cm_inmueble", body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  }
};
