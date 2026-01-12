import { obtenerPisos } from "../../pronobis/piso.service";
import { obtenerClienteYProyectos } from "../../pronobis/pronobis.service";
import { obtenerClienteYCedulaPorValorCedula } from "../helpers/obtenerClienteYCedulaPorCedula.service";
import { obtenerPisosPorCedula } from "../helpers/obtenerPisosPorProyecto.service";
import { obtenerProyectosPorCedula } from "../helpers/obtenerPryPorCedula.service";
import { obtenerPisosNuevos } from "../helpers/pisos.helper";
import {
  extraerNombresProyectosSdp,
  obtenerProyectosNuevos,
} from "../helpers/proyecto.helper";
import { poblarCedulaYCliente } from "./sdpPopulateClientAndCardNumber.service";
import { poblarPisos } from "./sdpPopulateFloors.service";
import { poblarProyectos } from "./spdPopulateProjects.service";

export const poblarTablasSdp = async (cedula: string) => {
  const { data } = await obtenerClienteYProyectos(cedula);

  const proyectos = data.proyectos ?? [];
  if (proyectos.length === 0) return;

  /* =========================
   * FASE 1 – PROYECTOS
   * ========================= */

  const proyectosPronobis = proyectos.map((p) => p.nombreProyecto.trim());

  let proyectosExistentes = await obtenerProyectosPorCedula(cedula);
  const nombresProyectosSdp = extraerNombresProyectosSdp(proyectosExistentes);

  const proyectosNuevos = obtenerProyectosNuevos(
    proyectosPronobis,
    nombresProyectosSdp
  );

  if (proyectosNuevos.length > 0) {
    await poblarProyectos(proyectosNuevos, cedula);

    // 🔑 CLAVE: refrescar proyectos SDP
    proyectosExistentes = await obtenerProyectosPorCedula(cedula);
  }

  /* =========================
   * FASE 2 – PISOS
   * ========================= */

  const todosLosPisos = await obtenerPisosPorCedula(cedula);

  for (const proyecto of proyectos) {
    const { codigoCompania, codigoProyecto, nombreProyecto } = proyecto;

    const responsePisos = await obtenerPisos(
      cedula,
      String(codigoCompania),
      String(codigoProyecto)
    );

    const nombresPisosPronobis =
      responsePisos.data
        ?.map((p) => p.nombrePiso?.trim())
        .filter((p): p is string => Boolean(p)) ?? [];

    if (nombresPisosPronobis.length === 0) continue;

    const proyectoSdp = proyectosExistentes.find(
      (p) =>
        p.cm_attributes.txt_name.trim().toLowerCase() ===
        nombreProyecto.trim().toLowerCase()
    );

    if (!proyectoSdp) continue;

    const pisosPorProyecto = todosLosPisos.filter(
      (p) => p.cm_attributes.ref_proyecto.id === proyectoSdp.id
    );

    const nombresPisosSdp = pisosPorProyecto.map((p) =>
      p.cm_attributes.txt_name.trim()
    );

    const pisosNuevos = obtenerPisosNuevos(
      nombresPisosPronobis,
      nombresPisosSdp
    );

    if (pisosNuevos.length > 0) {
      await poblarPisos(pisosNuevos, cedula, proyectoSdp.id);
    }
  }
};

// Version anterior con tablas de cliente y cedula
// const cliente = data.cliente?.cliente;
// if (!cliente) {
//   throw new Error(`No existe cliente para la cédula ${cedula}`);
// }

// let clienteId: string;
// let cedulaId: string;

// const existente = await obtenerClienteYCedulaPorValorCedula(cedula);

// if (existente) {
//   ({ clienteId, cedulaId } = existente);
// } else {
//   const result = await poblarCedulaYCliente(cedula, cliente);
//   clienteId = result.clienteId;
//   cedulaId = result.cedulaId;
// }
