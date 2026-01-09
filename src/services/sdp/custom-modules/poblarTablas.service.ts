import { obtenerClienteYProyectos } from "../../pronobis/pronobis.service";
import { obtenerClienteYCedulaPorValorCedula } from "../helpers/obtenerClienteYCedulaPorCedula.service";
import { poblarCedulaYCliente } from "./sdpPopulateClientAndCardNumber.service";
import { poblarProyectos } from "./spdPopulateProjects.service";

export const poblarTablasSdp = async (cedula: string) => {
  const { data } = await obtenerClienteYProyectos(cedula);

  const cliente = data.cliente?.cliente;
  const proyectos = data.proyectos?.map((p) => p.nombreProyecto) ?? [];

  if (!cliente) {
    throw new Error(`No existe cliente para la cédula ${cedula}`);
  }

  let clienteId: string;
  let cedulaId: string;

  const existente = await obtenerClienteYCedulaPorValorCedula(cedula);

  if (existente) {
    ({ clienteId, cedulaId } = existente);
  } else {
    const result = await poblarCedulaYCliente(cedula, cliente);
    clienteId = result.clienteId;
    cedulaId = result.cedulaId;
  }

  if (proyectos.length > 0) {
    await poblarProyectos(proyectos, cedulaId, clienteId);
  }
};
