import { sdpHttpClient } from "../sdpHttp.client";

export async function agregarValoresCedula(
  cedula: string,
  cliente: string
): Promise<void> {
  console.log("CLIENTE---------------------------------", cliente);

  try {
    const body = new URLSearchParams({
      input_data: JSON.stringify({
        cm_cedula: {
          cm_attributes: {
            txt_name: cedula,
          },
        },
      }),
    });

    const response = await sdpHttpClient.post("/api/v3/cm_cedula", body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    // console.log("RESPONSE DE CEDULA------->", response.data);
    const cedulaId = response.data?.cm_cedula?.id;

    const bodyCliente = new URLSearchParams({
      input_data: JSON.stringify({
        cm_cliente: {
          cm_attributes: {
            ref_cedula: {
              id: cedulaId, // ID del registro en cm_cedula
            },
            txt_name: cliente,
          },
        },
      }),
    });

    await sdpHttpClient.post("/api/v3/cm_cliente", bodyCliente, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  } catch (error: any) {
    console.error("SDP DATA:", error.response?.data);
    throw error;
  }
}

// {"cm_cliente":{"cm_attributes":{"ref_cedula":{"id":"256297000000616001"},"txt_name":"Nombre de prueba"}}}
