import { sdpHttpClient } from "./sdpHttp.client";
import qs from "qs";

export async function actualizarUdfProyectos(
  udfFieldId: string,
  valores: string[]
): Promise<void> {
//   const valoresNormalizados = [
//     ...new Set(
//       valores
//         .filter((v) => typeof v === "string")
//         .map((v) => v.trim())
//         .filter((v) => v.length > 0)
//         .map((v) => v.substring(0, 100))
//     ),
//   ];

//   if (valoresNormalizados.length === 0) {
  if (valores.length === 0) {
    console.warn("⚠️ No hay valores válidos para enviar a SDP");
    return;
  }

  const inputData = {
    udf_field: {
      allowed_values: valores.map((v) => ({ value: v })),
    },
  };

  const body = qs.stringify({
    input_data: JSON.stringify(inputData),
  });

  try {
    await sdpHttpClient.put(
      `/api/v3/udf_fields/${udfFieldId}`,
      body,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  } catch (error: any) {
    console.error("❌ SDP ERROR STATUS:", error.response?.status);
    console.error(
      "❌ SDP ERROR BODY:",
      JSON.stringify(error.response?.data, null, 2)
    );
    throw error;
  }
}
