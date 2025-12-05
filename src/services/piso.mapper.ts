import { Piso } from "../types/pronobisPiso";

export const mapPiso = (row: any): Piso => ({
  codigoPiso: row.CCiPiso?.trim(),
  nombrePiso: row.CNoPiso?.trim()
});
