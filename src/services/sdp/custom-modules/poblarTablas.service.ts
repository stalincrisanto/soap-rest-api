import { obtenerInmuebles } from "../../pronobis/inmueble.service";
import { obtenerPisos } from "../../pronobis/piso.service";
import { obtenerClienteYProyectos } from "../../pronobis/pronobis.service";
import { obtenerClienteYCedulaPorValorCedula } from "../helpers/obtenerClienteYCedulaPorCedula.service";
import { obtenerInmueblesPorCedula } from "../helpers/obtenerInmueblesPorCedula.service";
import { obtenerPisosPorCedula } from "../helpers/obtenerPisosPorProyecto.service";
import { obtenerProyectosPorCedula } from "../helpers/obtenerPryPorCedula.service";
import { obtenerPisosNuevos } from "../helpers/pisos.helper";
import {
  extraerNombresProyectosSdp,
  obtenerInmueblesNuevos,
  obtenerProyectosNuevos,
} from "../helpers/proyecto.helper";
import { poblarCedulaYCliente } from "./sdpPopulateClientAndCardNumber.service";
import { poblarPisos } from "./sdpPopulateFloors.service";
import { poblarInmuebles } from "./sdpPopulateInmueble.service";
import { poblarProyectos } from "./spdPopulateProjects.service";

export const poblarTablasSdp = async (cedula: string) => {
  const { data } = await obtenerClienteYProyectos(cedula);

  const proyectos = data.proyectos ?? [];
  if (proyectos.length === 0) return;

  /* =====================================================
   * FASE 1 – PROYECTOS
   * ===================================================== */

  const proyectosPronobis = proyectos.map((p) => p.nombreProyecto.trim());

  let proyectosExistentes = await obtenerProyectosPorCedula(cedula);
  const nombresProyectosSdp = extraerNombresProyectosSdp(proyectosExistentes);

  const proyectosNuevos = obtenerProyectosNuevos(
    proyectosPronobis,
    nombresProyectosSdp
  );

  if (proyectosNuevos.length > 0) {
    await poblarProyectos(proyectosNuevos, cedula);

    // 🔄 refrescar proyectos SDP (IDs necesarios para pisos)
    proyectosExistentes = await obtenerProyectosPorCedula(cedula);
  }

  /* =====================================================
   * FASE 2 – PISOS
   * ===================================================== */

  // 🔹 Todos los pisos SDP por cédula (filtrado luego en memoria)
  const todosLosPisos = await obtenerPisosPorCedula(cedula);

  for (const proyecto of proyectos) {
    const { codigoCompania, codigoProyecto, nombreProyecto } = proyecto;

    // 🔹 Proyecto SDP correspondiente
    const proyectoSdp = proyectosExistentes.find(
      (p) =>
        p.cm_attributes.txt_name.trim().toLowerCase() ===
        nombreProyecto.trim().toLowerCase()
    );

    if (!proyectoSdp) continue;

    // 🔹 Pisos desde PRONOBIS (source of truth)
    const responsePisos = await obtenerPisos(
      cedula,
      String(codigoCompania),
      String(codigoProyecto)
    );

    const pisosPronobis = responsePisos.data ?? [];
    if (pisosPronobis.length === 0) continue;

    // 🔹 Pisos SDP del proyecto
    const pisosPorProyecto = todosLosPisos.filter(
      (p) => p.cm_attributes.ref_proyecto.id === proyectoSdp.id
    );

    // 🔹 Nombres de pisos para diff
    const nombresPisosPronobis = pisosPronobis
      .map((p) => p.nombrePiso?.trim())
      .filter((p): p is string => Boolean(p));

    const nombresPisosSdp = pisosPorProyecto.map((p) =>
      p.cm_attributes.txt_name.trim()
    );

    const pisosNuevos = obtenerPisosNuevos(
      nombresPisosPronobis,
      nombresPisosSdp
    );

    if (pisosNuevos.length > 0) {
      await poblarPisos(pisosNuevos, cedula, proyectoSdp.id);

      // 🔄 refrescar pisos SDP para inmuebles
      // (opcional pero seguro)
      const pisosActualizados = await obtenerPisosPorCedula(cedula);
      todosLosPisos.splice(0, todosLosPisos.length, ...pisosActualizados);
    }
  }

  /* =====================================================
   * FASE 3 – INMUEBLES
   * ===================================================== */

  // 🔹 Todos los inmuebles SDP por cédula
  const todosLosInmuebles = await obtenerInmueblesPorCedula(cedula);

  for (const proyecto of proyectos) {
    const { codigoCompania, codigoProyecto, nombreProyecto } = proyecto;

    // 🔹 Proyecto SDP
    const proyectoSdp = proyectosExistentes.find(
      (p) =>
        p.cm_attributes.txt_name.trim().toLowerCase() ===
        nombreProyecto.trim().toLowerCase()
    );

    if (!proyectoSdp) continue;

    // 🔹 Pisos SDP del proyecto
    const pisosPorProyecto = todosLosPisos.filter(
      (p) => p.cm_attributes.ref_proyecto.id === proyectoSdp.id
    );

    if (pisosPorProyecto.length === 0) continue;

    // 🔹 Pisos PRONOBIS (con códigos reales)
    const responsePisos = await obtenerPisos(
      cedula,
      String(codigoCompania),
      String(codigoProyecto)
    );

    const pisosPronobis = responsePisos.data ?? [];
    if (pisosPronobis.length === 0) continue;

    for (const pisoPronobis of pisosPronobis) {
      const { codigoPiso, nombrePiso } = pisoPronobis;

      // 🔹 Piso SDP correspondiente (por nombre)
      const pisoSdp = pisosPorProyecto.find(
        (p) =>
          p.cm_attributes.txt_name.trim().toLowerCase() ===
          nombrePiso?.trim().toLowerCase()
      );

      if (!pisoSdp) continue;

      // 🔹 Inmuebles desde PRONOBIS (USANDO CÓDIGO DE PISO)
      const responseInmuebles = await obtenerInmuebles(
        cedula,
        String(codigoCompania),
        String(codigoProyecto),
        String(codigoPiso) // 👈 CLAVE
      );

      const nombresInmueblesPronobis =
        responseInmuebles.data
          ?.map((i) => i.nombreInmueble?.trim())
          .filter((i): i is string => Boolean(i)) ?? [];

      if (nombresInmueblesPronobis.length === 0) continue;

      // 🔹 Inmuebles SDP por piso
      const inmueblesPorPiso = todosLosInmuebles.filter(
        (i) => i.cm_attributes.ref_piso.id === pisoSdp.id
      );

      const nombresInmueblesSdp = inmueblesPorPiso.map((i) =>
        i.cm_attributes.txt_name.trim()
      );

      const inmueblesNuevos = obtenerInmueblesNuevos(
        nombresInmueblesPronobis,
        nombresInmueblesSdp
      );

      if (inmueblesNuevos.length > 0) {
        await poblarInmuebles(
          inmueblesNuevos,
          cedula,
          proyectoSdp.id,
          pisoSdp.id
        );
      }
    }
  }
};
