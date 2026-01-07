import { obtenerClienteYProyectos } from "../pronobis.service";
import { actualizarUdfProyectos } from "./sdpUdf.service";

const UDF_PROYECTOS_ID = "256297000000033015";

export const poblarCamposPorCedula = async (cedula: string) => {
  // 1️⃣ Cliente + Proyectos
  const { data } = await obtenerClienteYProyectos(cedula);

  const proyectos = data.proyectos ?? [];

  if (proyectos.length === 0) {
    return {
      proyectos: 0,
      pisos: 0,
    };
  }

  // 2️⃣ Poblar UDF de proyectos (solo nombres)
  const nombresProyectos = proyectos.map(
    (p) => p.nombreProyecto
  );

  await actualizarUdfProyectos(UDF_PROYECTOS_ID, nombresProyectos);
}
