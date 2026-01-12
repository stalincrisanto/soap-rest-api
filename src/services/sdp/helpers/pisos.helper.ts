export const obtenerPisosNuevos = (
  pisosPronobis: string[],
  pisosSdp: string[]
): string[] => {
  const setSdp = new Set(pisosSdp.map((p) => p.toLowerCase()));

  return pisosPronobis.filter((p) => !setSdp.has(p.toLowerCase()));
};
