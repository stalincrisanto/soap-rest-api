import { sdpHttpClient } from "../../../clients/sdpHttp.client";

export async function poblarCedulaYCliente(
  cedula: string,
  cliente: string
): Promise<{ cedulaId: string; clienteId: string }> {
  try {
    const bodyCedula = new URLSearchParams({
      input_data: JSON.stringify({
        cm_cedula: {
          cm_attributes: {
            txt_name: cedula,
          },
        },
      }),
    });

    const cedulaResponse = await sdpHttpClient.post(
      "/api/v3/cm_cedula",
      bodyCedula,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const cedulaId = cedulaResponse.data?.cm_cedula?.id;

    if (!cedulaId) {
      throw new Error("Error creando la cédula en SDP");
    }

    const bodyCliente = new URLSearchParams({
      input_data: JSON.stringify({
        cm_cliente: {
          cm_attributes: {
            ref_cedula: { id: cedulaId },
            txt_name: cliente,
          },
        },
      }),
    });

    const clienteResponse = await sdpHttpClient.post(
      "/api/v3/cm_cliente",
      bodyCliente,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const clienteId = clienteResponse.data?.cm_cliente?.id;

    return { cedulaId, clienteId };
  } catch (error: any) {
    const sdpMessage =
      error.response?.data?.message || error.response?.data || error.message;

    console.error("Error al poblar cédula y nombres:", sdpMessage);

    throw new Error(
      `Error al poblar cédula y nombres: ${JSON.stringify(sdpMessage)}`
    );
  }
}
