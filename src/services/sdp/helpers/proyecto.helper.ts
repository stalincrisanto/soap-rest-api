import { CmProyecto } from "../../../types/sdp/cm-proyectos.response";

export const extraerNombresProyectosSdp = (
  proyectos: CmProyecto[]
): string[] => {
  return proyectos.map((p) => p.cm_attributes.txt_name.trim());
};

export const obtenerProyectosNuevos = (
  proyectosPronobis: string[],
  proyectosSdp: string[]
): string[] => {
  const setSdp = new Set(proyectosSdp.map((p) => p.toLowerCase()));

  return proyectosPronobis.filter((p) => !setSdp.has(p.toLowerCase()));
};

export const obtenerPisosNuevos = (
  pisosPronobis: string[],
  pisosSdp: string[]
): string[] => {
  const setSdp = new Set(pisosSdp.map((p) => p.toLowerCase()));

  return pisosPronobis.filter((p) => !setSdp.has(p.toLowerCase()));
};

export const obtenerInmueblesNuevos = (
  inmueblesPronobis: string[],
  inmueblesSdp: string[]
): string[] => {
  const setSdp = new Set(inmueblesSdp.map((i) => i.toLowerCase()));

  return inmueblesPronobis.filter((i) => !setSdp.has(i.toLowerCase()));
};
