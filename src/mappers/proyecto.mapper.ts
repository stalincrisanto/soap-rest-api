import { Proyecto } from "../types/pronobis/pronobisClienteProyectos";

export const mapProyecto = (row: any): Proyecto => ({
  codigoCompania: row.CCiCompania?.trim(),
  codigoProyecto: row.CCiProyecto?.trim(),
  nombreProyecto: row.CNoProyecto?.trim(),
});
