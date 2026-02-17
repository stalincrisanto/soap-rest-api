import { sdpHttpClient } from "../../../clients/sdpHttp.client";
import { mapProyectoToSdpInput } from "../../../mappers/proyectoSdp.mapper";
import { logger } from "../../../utils/logger";

export async function poblarProyectos(
  proyectos: string[],
  cedula: string
): Promise<void> {
  for (const nombreProyecto of proyectos) {
    const body = new URLSearchParams({
      input_data: JSON.stringify(mapProyectoToSdpInput(nombreProyecto, cedula)),
    });

    try {
      await sdpHttpClient.post("/api/v3/cm_proyecto", body, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      logger.success("Proyecto creado", { cedula, nombreProyecto });
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.response?.data || error.message;

      logger.error("Error creando proyecto", { cedula, nombreProyecto, message });

      throw new Error(
        `Error creando proyecto '${nombreProyecto}': ${JSON.stringify(message)}`
      );
    }
  }
}
