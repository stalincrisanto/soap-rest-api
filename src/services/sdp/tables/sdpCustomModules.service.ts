import { sdpHttpClient } from "../sdpHttp.client";

export async function agregarValoresCedula(cedula: string): Promise<void> {
  const body = new URLSearchParams({
    input_data: JSON.stringify({
      cm_cedula: {
        cm_attributes: {
          txt_name: cedula,
        },
      },
    }),
  });

  try {
    await sdpHttpClient.post("/api/v3/cm_cedula", body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  } catch (error: any) {
    console.error("SDP DATA:", error.response?.data);
    throw error;
  }
}
