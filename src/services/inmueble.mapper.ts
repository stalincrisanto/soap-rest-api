import { Inmueble } from "../types/pronobisInmueble";

export const mapInmueble = (row: any): Inmueble => ({
  codigoInmueble: row.CCiInmueble?.trim(),
  nombreInmueble: row.CNoInmueble?.trim(),
});
