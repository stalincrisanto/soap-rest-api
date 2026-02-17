import { Inmueble } from "../types/pronobis/pronobisInmueble";

export const mapInmueble = (row: any): Inmueble => ({
  codigoInmueble: row.CCiInmueble?.trim(),
  nombreInmueble: row.CNoInmueble?.trim(),
});
