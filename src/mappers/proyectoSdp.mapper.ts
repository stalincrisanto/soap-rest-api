export function mapProyectoToSdpInput(
  proyectoNombre: string,
  cedula: string,
) {
  return {
    cm_proyecto: {
      cm_attributes: {
        txt_cedula_cliente: cedula,
        txt_name: proyectoNombre,
      },
    },
  };
}
