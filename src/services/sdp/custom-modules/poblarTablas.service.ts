import { obtenerInmuebles } from "../../pronobis/inmueble.service";
import { obtenerPisos } from "../../pronobis/piso.service";
import { obtenerClienteYProyectos } from "../../pronobis/pronobis.service";
import { obtenerInmueblesPorCedula } from "../helpers/obtenerInmueblesPorCedula.service";
import { obtenerPisosPorCedula } from "../helpers/obtenerPisosPorProyecto.service";
import { obtenerProyectosPorCedula } from "../helpers/obtenerPryPorCedula.service";
import { obtenerPisosNuevos } from "../helpers/pisos.helper";
import {
  extraerNombresProyectosSdp,
  obtenerInmueblesNuevos,
  obtenerProyectosNuevos,
} from "../helpers/proyecto.helper";
import { poblarPisos } from "./sdpPopulateFloors.service";
import { poblarInmuebles } from "./sdpPopulateInmueble.service";
import { poblarProyectos } from "./spdPopulateProjects.service";
import { logger } from "../../../utils/logger";

export const poblarTablasSdp = async (cedula: string) => {
  logger.process("Inicio de proceso integral SDP", { cedula });

  const { data } = await obtenerClienteYProyectos(cedula);

  const proyectos = data.proyectos ?? [];
  if (proyectos.length === 0) {
    logger.success("Sin proyectos para procesar", { cedula });
    return;
  }

  const proyectosPronobis = proyectos.map((p) => p.nombreProyecto.trim());

  let proyectosExistentes = await obtenerProyectosPorCedula(cedula);
  const nombresProyectosSdp = extraerNombresProyectosSdp(proyectosExistentes);

  const proyectosNuevos = obtenerProyectosNuevos(
    proyectosPronobis,
    nombresProyectosSdp
  );

  if (proyectosNuevos.length > 0) {
    logger.process("Creando proyectos nuevos", {
      cedula,
      cantidad: proyectosNuevos.length,
    });

    await poblarProyectos(proyectosNuevos, cedula);
    proyectosExistentes = await obtenerProyectosPorCedula(cedula);
  }

  const todosLosPisos = await obtenerPisosPorCedula(cedula);

  for (const proyecto of proyectos) {
    const { codigoCompania, codigoProyecto, nombreProyecto } = proyecto;

    const proyectoSdp = proyectosExistentes.find(
      (p) =>
        p.cm_attributes.txt_name.trim().toLowerCase() ===
        nombreProyecto.trim().toLowerCase()
    );

    if (!proyectoSdp) {
      logger.error("Proyecto no encontrado en SDP", { cedula, nombreProyecto });
      continue;
    }

    const responsePisos = await obtenerPisos(
      cedula,
      String(codigoCompania),
      String(codigoProyecto)
    );

    const pisosPronobis = responsePisos.data ?? [];
    if (pisosPronobis.length === 0) continue;

    const pisosPorProyecto = todosLosPisos.filter(
      (p) => p.cm_attributes.ref_proyecto.id === proyectoSdp.id
    );

    const nombresPisosPronobis = pisosPronobis
      .map((p) => p.nombrePiso?.trim())
      .filter((p): p is string => Boolean(p));

    const nombresPisosSdp = pisosPorProyecto.map((p) =>
      p.cm_attributes.txt_name.trim()
    );

    const pisosNuevos = obtenerPisosNuevos(nombresPisosPronobis, nombresPisosSdp);

    if (pisosNuevos.length > 0) {
      logger.process("Creando pisos nuevos", {
        cedula,
        proyecto: nombreProyecto,
        cantidad: pisosNuevos.length,
      });

      await poblarPisos(pisosNuevos, cedula, proyectoSdp.id);

      const pisosActualizados = await obtenerPisosPorCedula(cedula);
      todosLosPisos.splice(0, todosLosPisos.length, ...pisosActualizados);
    }
  }

  const todosLosInmuebles = await obtenerInmueblesPorCedula(cedula);

  for (const proyecto of proyectos) {
    const { codigoCompania, codigoProyecto, nombreProyecto } = proyecto;

    const proyectoSdp = proyectosExistentes.find(
      (p) =>
        p.cm_attributes.txt_name.trim().toLowerCase() ===
        nombreProyecto.trim().toLowerCase()
    );

    if (!proyectoSdp) continue;

    const pisosPorProyecto = todosLosPisos.filter(
      (p) => p.cm_attributes.ref_proyecto.id === proyectoSdp.id
    );

    if (pisosPorProyecto.length === 0) continue;

    const responsePisos = await obtenerPisos(
      cedula,
      String(codigoCompania),
      String(codigoProyecto)
    );

    const pisosPronobis = responsePisos.data ?? [];
    if (pisosPronobis.length === 0) continue;

    for (const pisoPronobis of pisosPronobis) {
      const { codigoPiso, nombrePiso } = pisoPronobis;

      const pisoSdp = pisosPorProyecto.find(
        (p) =>
          p.cm_attributes.txt_name.trim().toLowerCase() ===
          nombrePiso?.trim().toLowerCase()
      );

      if (!pisoSdp) continue;

      const responseInmuebles = await obtenerInmuebles(
        cedula,
        String(codigoCompania),
        String(codigoProyecto),
        String(codigoPiso)
      );

      const nombresInmueblesPronobis =
        responseInmuebles.data
          ?.map((i) => i.nombreInmueble?.trim())
          .filter((i): i is string => Boolean(i)) ?? [];

      if (nombresInmueblesPronobis.length === 0) continue;

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
        logger.process("Creando inmuebles nuevos", {
          cedula,
          proyecto: nombreProyecto,
          piso: nombrePiso,
          cantidad: inmueblesNuevos.length,
        });

        await poblarInmuebles(inmueblesNuevos, cedula, proyectoSdp.id, pisoSdp.id);
      }
    }
  }

  logger.success("Proceso integral SDP finalizado", { cedula });
};
