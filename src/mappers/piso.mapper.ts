import { Piso } from "../types/pronobis/pronobisPiso";

export const mapPiso = (row: any): Piso => ({
  codigoPiso: row.CCiPiso?.trim(),
  nombrePiso: row.CNoPiso?.trim()
});
