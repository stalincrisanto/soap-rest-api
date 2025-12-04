import { Cliente } from "../types/pronobisClienteProyectos";

export const mapCliente = (row: any): Cliente => ({
  tipoDocumento: row.CCiTipoIdentificacion?.trim(),
  documento: row.CCiDocumento?.trim(),
  cliente: row.CDsCliente?.trim(),
  email: row.CTxEmail?.trim(),
  celular: row.CTxCelular?.trim(),
  direccion: row.CTxDireccion?.trim(),
});
