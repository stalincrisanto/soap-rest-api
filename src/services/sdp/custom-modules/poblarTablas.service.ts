import { obtenerClienteYProyectos } from "../../pronobis/pronobis.service";
import { obtenerClienteYCedulaPorValorCedula } from "../helpers/obtenerClienteYCedulaPorCedula.service";
import { obtenerProyectosPorCedula } from "../helpers/obtenerPryPorCedula.service";
import {
  extraerNombresProyectosSdp,
  obtenerProyectosNuevos,
} from "../helpers/proyecto.helper";
import { poblarCedulaYCliente } from "./sdpPopulateClientAndCardNumber.service";
import { poblarProyectos } from "./spdPopulateProjects.service";

export const poblarTablasSdp = async (cedula: string) => {
  const { data } = await obtenerClienteYProyectos(cedula);

  console.log("data", data);

  const proyectosPronobis =
    data.proyectos?.map((p) => p.nombreProyecto.trim()) ?? [];

  if (proyectosPronobis.length === 0) {
    return;
  }

  const proyectosExistentes = await obtenerProyectosPorCedula(cedula);
  const nombresProyectosSdp = extraerNombresProyectosSdp(proyectosExistentes);

  const proyectosNuevos = obtenerProyectosNuevos(
    proyectosPronobis,
    nombresProyectosSdp
  );

  if (proyectosNuevos.length === 0) {
    return;
  }

  await poblarProyectos(proyectosNuevos, cedula);
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
