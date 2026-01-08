import { obtenerClienteYProyectos } from "../../pronobis.service";
import { agregarValoresCedula } from "./sdpCustomModules.service";

export const poblarTablasPorCedula = async (cedula: string) => {
  const { data } = await obtenerClienteYProyectos(cedula);

  const proyectos = data.proyectos ?? [];
  const cliente = data.cliente?.cliente ?? "";

  if (proyectos.length === 0) {
    return {
      proyectos: 0,
      pisos: 0,
    };
  }

  // 2️⃣ Poblar UDF de proyectos (solo nombres)
  //   const nombresProyectos = proyectos.map(
  //     (p) => p.nombreProyecto
  //   );

  await agregarValoresCedula(cedula, cliente);;
};
