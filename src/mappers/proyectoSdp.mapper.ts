export function mapProyectoToSdpInput(
  proyectoNombre: string,
  cedulaId: string,
  clienteId: string
) {
  return {
    cm_proyecto: {
      cm_attributes: {
        ref_c_dula_del_cliente: { id: cedulaId },
        ref_nombre_del_cliente: { id: clienteId },
        txt_name: proyectoNombre,
      },
    },
  };
}
